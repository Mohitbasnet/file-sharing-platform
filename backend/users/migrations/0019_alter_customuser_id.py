# Generated by Django 5.0.2 on 2024-03-11 14:57

import shortuuid.main
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0018_alter_customuser_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="id",
            field=models.CharField(
                default=shortuuid.main.ShortUUID.uuid,
                editable=False,
                max_length=22,
                primary_key=True,
                serialize=False,
                verbose_name="ID",
            ),
        ),
    ]
