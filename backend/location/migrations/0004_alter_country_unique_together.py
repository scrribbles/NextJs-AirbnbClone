# Generated by Django 5.1.4 on 2025-01-10 01:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0003_alter_continent_id_alter_country_id_alter_state_id_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='country',
            unique_together={('name', 'dialing_code')},
        ),
    ]
