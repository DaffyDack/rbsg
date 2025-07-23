<script setup lang="ts">
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
</script>
<template>
  <div class="title">
    <Avatar
      image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
      class="mr-2"
      shape="circle"
    />
    <div class="mr-10 ml-3">Название проекта</div>
    <AvatarGroup>
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      />
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
        shape="circle"
      />
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
        shape="circle"
      />
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png"
        shape="circle"
      />
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png"
        shape="circle"
      />
      <Avatar label="+2" shape="circle" />
    </AvatarGroup>
  </div>
</template>
