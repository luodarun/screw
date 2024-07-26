<template>
  <div>
      v-image
      <img :src="propValue">
  </div>
</template>

<script>
export default {
  props: {
      propValue: {
          type: String,
          require: true,
      },
  },
}
</script>
