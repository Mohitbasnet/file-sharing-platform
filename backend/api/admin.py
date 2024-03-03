from django.contrib import admin
from .models import (
    Organization,
    File,
    OrganizationMember,
    Favourite,
    Invitation,
    Favourite,
)

admin.site.register(Organization)
admin.site.register(File)
admin.site.register(OrganizationMember)
admin.site.register(Favourite)
admin.site.register(Invitation)
