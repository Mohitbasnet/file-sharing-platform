from django.utils.translation import gettext_lazy as _
from django.db import models
from users.models import CustomUser as User
import shortuuid


class Organization(models.Model):
    id = models.CharField(
        _("ID"), primary_key=True, max_length=22, default=shortuuid.uuid, editable=False
    )
    name = models.CharField(_("Name"), max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Organization, self).save(*args, **kwargs)
        OrganizationMember.objects.create(
            user=self.creator, organization=self, role="admin"
        )


class OrganizationMember(models.Model):
    ROLE_CHOICES = (
        ("admin", _("Admin")),
        ("editor", _("Editor")),
        ("member", _("Member")),
    )
    id = models.CharField(
        _("ID"), primary_key=True, max_length=22, default=shortuuid.uuid, editable=False
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, related_name="members"
    )
    role = models.CharField(
        _("Role"), max_length=255, choices=ROLE_CHOICES, default="member"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def can_change(self):
        return self.role == "admin"

    def __str__(self):
        return self.user.email


class Invitation(models.Model):
    INVIATION_STATUS = (
        ("pending", _("Pending")),
        ("accepted", _("Accepted")),
        ("rejected", _("Rejected")),
    )

    id = models.CharField(
        _("ID"), primary_key=True, max_length=22, default=shortuuid.uuid, editable=False
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        _("Status"), max_length=255, choices=INVIATION_STATUS, default="pending"
    )

    def __str__(self):
        return f"{self.user.email} - {self.organization.name}"

    def save(self, *args, **kwargs):
        super(Invitation, self).save(*args, **kwargs)
        if self.status == "accepted":
            OrganizationMember.objects.create(
                user=self.user, organization=self.organization
            )


class File(models.Model):
    id = models.CharField(
        _("ID"), primary_key=True, max_length=22, default=shortuuid.uuid, editable=False
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(_("File"), upload_to="files/")
    file_name = models.CharField(_("File Name"), max_length=255)
    file_path = models.CharField(_("File Path"), max_length=455, blank=True)
    file_type = models.CharField(_("File Type"), max_length=255, blank=True)
    is_private = models.BooleanField(_("Is Private"), default=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_trashed = models.BooleanField(_("Is Trashed"), default=False)

    def __str__(self):
        return self.file.name

    def save(self, *args, **kwargs):
        self.file_path = self.file.url
        self.file_type = self.file.name.split(".")[-1]
        super(File, self).save(*args, **kwargs)


class Favourite(models.Model):
    id = models.CharField(
        _("ID"), primary_key=True, max_length=22, default=shortuuid.uuid, editable=False
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.file_name
