from django.utils.translation import gettext_lazy as _
from django.db import models
from users.models import CustomUser as User
import shortuuid


class File(models.Model):
    id = models.CharField(
        _("ID"), primary_key=True, max_length=22, default=shortuuid.uuid, editable=False
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(_("File"), upload_to="files/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
