# Generated by Django 5.0.2 on 2024-03-03 16:42

import shortuuid.main
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_invitation_status_alter_favourite_id_alter_file_id_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="favourite",
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
        migrations.AlterField(
            model_name="file",
            name="file_path",
            field=models.CharField(
                blank=True, max_length=455, verbose_name="File Path"
            ),
        ),
        migrations.AlterField(
            model_name="file",
            name="file_type",
            field=models.CharField(
                blank=True, max_length=255, verbose_name="File Type"
            ),
        ),
        migrations.AlterField(
            model_name="file",
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
        migrations.AlterField(
            model_name="invitation",
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
        migrations.AlterField(
            model_name="organization",
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
        migrations.AlterField(
            model_name="organizationmember",
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
