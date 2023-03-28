<template>
    <transition name="layer">
      <div class="layer" v-if="open" @click="$emit('close')"></div>
    </transition>

    <transition name="content">
      <div class="content" v-if="open">
        <slot />
      </div>
    </transition>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.layer{
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  cursor: pointer;
  z-index: 9998;
}

.content{
  position: fixed;
  right: 0;
  top: 0;
  width: 500px;
  height: 100%;
  background: #fff;
  z-index: 9999;
}

/* transition styles layer */
.layer-enter-active,
.layer-leave-active {
  transition: opacity 0.3s ease;
}

.layer-enter-from,
.layer-leave-to {
  opacity: 0;
}

/* transition styles content */
.content-enter-active,
.content-leave-active {
  transition: 0.3s ease;
}

.content-enter-from,
.content-leave-to {
  transform: translateX(100%);
}
</style>