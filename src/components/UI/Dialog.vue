<script lang="ts" setup>
interface DialogProps {
  visible: boolean
  okText: string
  cancelText: string
  onOk: () => void
  onCancel: () => void
}

const props = withDefaults(defineProps<DialogProps>(), {
  visible: false,
  okText: 'OK',
  cancelText: 'Cancel',
  onOk: () => {},
  onCancel: () => {}
})

function closeDialog() {
  props.onCancel()
  emit('update:visible', false)
}

const emit = defineEmits(['update:visible'])
</script>

<template>
  <teleport to="body">
    <div class="dialog" v-if="visible">
      <div class="dialog__overlay" @click="closeDialog"></div>
      <div class="dialog__content">
        <slot></slot>
        <div class="dialog__actions">
          <button class="dialog__action" @click="closeDialog">{{ props.cancelText }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.dialog {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1001;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 1rem;
    border-radius: .25rem;
    box-shadow: 0 0 1px rgba(0, 0, 0, .25);
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
}

</style>