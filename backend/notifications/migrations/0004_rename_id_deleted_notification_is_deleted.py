# Generated by Django 5.1.4 on 2025-01-16 12:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0003_alter_notification_id_deleted'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notification',
            old_name='id_deleted',
            new_name='is_deleted',
        ),
    ]
