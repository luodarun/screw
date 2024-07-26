<template>
  <button class="v-button">v-button{{ propValue }}</button>
</template>

<script>
export default {
  props: {
      propValue: {
          type: String,
          default: '',
      },
  },
}
</script>
