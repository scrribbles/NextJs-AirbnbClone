from uuid import uuid4
from typing import Union, Optional
import hashlib

from airbnb import cipher
from django.db import models
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User, UserManager, AbstractBaseUser, PermissionsMixin
from phonenumber_field.formfields import PhoneNumberField
from phonenumber_field.phonenumber import PhoneNumber


from django.utils.translation import gettext_lazy as _

# Create your models here.


class CustomUserManager(UserManager):
    """
                    class to act as the user manager for the User Model
                    Inherits from AbstractBaseUser

                    methods:
                            - _prefill_user_details: private method that creates user and adds important field attributes
                            - create_user: public method that fill user with non-admin priviledges
                            - create_superuser: public method that fills user with admin priviledges

                    Returns:
                            Created User (normal user or superuser) or Error

    """

    def _prefill_user_details(self, password=None, email=None, **fields) -> Union['User', str]:
        """
                        private method that creates user and adds important field attributes

                        args:
                        - password: None

                        returns:
                        - An instance of the user class
        """

        if email is None:
            return _("Please provide an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, **fields)
        if password is None:
            user.set_unusable_password(password)
        else:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email: str, password: Optional[str], **fields) -> 'User':
        """
                public method that fills the user with non-admin attribures

                args:
                        - email: email addressed passed from serializer
                        - password: password passed from serializer

                returns:
                        An instance of the User model - regular user
        """

        fields.setdefault(_('is_admin'), False)
        fields.setdefault(_('is_staff'), False)
        # later set to false, so users can use verification link to update
        fields.setdefault(_('is_active'), True)
        fields.setdefault(_('is_superuser'), False)

        user = self._prefill_user_details(email=email, password=password,
                                          **fields)
        return user

    def create_superuser(self, email: str, password: Optional[str], **fields) -> 'User':
        """
                public member function that fills user with admin attributes and returns an admin user
                args:
                        - email: email addressed passed from serializer
                        - password: password passed from serializer

                returns:
                        An instance of the User model - Admin user
        """
        fields.setdefault(_('is_admin'), True)
        fields.setdefault(_('is_staff'), True)
        fields.setdefault(_('is_active'), True)
        fields.setdefault(_('is_superuser'), True)

        user = self._prefill_user_details(email=email, password=password,
                                          **fields)
        return user


gender = [('M', _('Male')), ('F', _('Female'))]


class User(AbstractBaseUser, PermissionsMixin):
    """
            Custom Django model class representing a user in the DB

    """
    id = models.UUIDField(default=uuid4, editable=False,
                          primary_key=True, null=False)
    email = models.EmailField(unique=True, blank=True)
    first_name = models.CharField(max_length=30, null=False, blank=True)
    last_name = models.CharField(max_length=30, null=False, blank=True)
    gender = models.CharField(choices=gender, max_length=1, blank=True)
    phone_number = PhoneNumberField()
    _image = models.ImageField(upload_to='images/user/', null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    # task_id = models.CharField(max_length=255, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(default=now)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['password', 'first_name', 'last_name']

    @property
    def image(self) -> str:
        """ returns a string of the user image """
        return f"/media/{self._image}"

    @image.setter
    def image(self, image: str) -> None:
        """ assigns an image to the user """
        self._image = image

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self) -> str:
        """ string representation that returns the user email"""
        return self.email

    class Meta:
        """ metadata class"""
        verbose_name = _("user")
        verbose_name_plural = _("users")



class BankingDetails(models.Model):
    """_summary_

    Args:
        models (_type_): _description_

    Returns:
        _type_: _description_
    """
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    bank_name = models.CharField(max_length=30, null=False)
    account_number = models.CharField(null=False, blank=False, max_length=34, unique=True)
    account_number_hash = models.CharField(max_length=68, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='banking_details')
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.bank_name} for {self.user.email}"

    class Meta:
        order_with_respect_to = _("user")
        verbose_name = _("Bank Detail")
        verbose_name_plural = _("Bank Details")

    def save(self, *args, **kwargs):
        """
        _summary_
        override the save method to set the default bank details for the user
        """
        if not self.account_number_hash:
            self.account_number_hash = hashlib.sha256(self.account_number.encode()).hexdigest()
            self.account_number = cipher.encrypt(self.account_number.encode()).decode()
        super().save(*args, **kwargs)

    @property
    def decrypt_account(self):
        return cipher.decrypt(self.account_number.encode()).decode()

    @property
    def mask_account(self):
        decrypted = self.decrypt_account
        return f"{decrypted[:2]}****{decrypted[-2:]}"

