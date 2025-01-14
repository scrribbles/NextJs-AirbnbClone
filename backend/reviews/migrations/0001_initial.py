# Generated by Django 5.1.4 on 2025-01-09 23:58

import django.core.validators
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('properties', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(5.0)])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='properties.properties')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='my_reviews', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'review',
                'verbose_name_plural': 'reviews',
                'ordering': ['-created_at'],
                'unique_together': {('property', 'user')},
            },
        ),
    ]
