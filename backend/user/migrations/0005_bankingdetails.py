# Generated by Django 5.1.4 on 2025-02-05 02:12

import django.db.models.deletion
import django.utils.timezone
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_user_is_deleted'),
    ]

    operations = [
        migrations.CreateModel(
            name='BankingDetails',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('bank_name', models.CharField(max_length=30)),
                ('account_number', models.CharField(max_length=34, unique=True)),
                ('account_number_hash', models.CharField(max_length=64, unique=True)),
                ('is_default', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='banking_details', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Bank Detail',
                'verbose_name_plural': 'Bank Details',
                'order_with_respect_to': 'user',
            },
        ),
    ]
