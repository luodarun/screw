<template>
    <div
        class="adjust-line-wrapper adjust-line-wrapper-v"
        @mousedown="onMousedown"
    >
        <div class="adjust-line adjust-line-v"></div>
        <div class="adjust-button">
            <div class="indicator"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
const emits = defineEmits(['lineMove']);

const onMousedown = (e: MouseEvent) => {
    let startX = e.clientX;
    let move = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        const offset = startX - moveEvent.clientX;
        emits('lineMove', offset);
        startX -= offset;
    };

    let up = (moveEvent: MouseEvent) => {
        document.removeEventListener('mousemove', move, true);
        document.removeEventListener('mouseup', up, true);
    };
    document.addEventListener('mousemove', move, true);
    document.addEventListener('mouseup', up, true);
};
</script>
<style lang="scss" scoped>
$activeHoverColor: #1593ff;
.adjust-line-wrapper {
    .adjust-line {
        border: 1px solid #eee;
    }

    .adjust-line-h {
        width: 100%;
    }

    .adjust-line-v {
        height: 100%;
    }

    .adjust-button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 30px;
        height: 10px;
        background-color: #fff;

        .indicator {
            margin: 0 auto;
            width: 10px;
            height: 1px;
            background-color: #ccd5db;
        }
    }

    &:hover {
        .adjust-button {
            background-color: $activeHoverColor;
        }

        .adjust-line {
            border-color: $activeHoverColor;
        }
    }
}
.adjust-line-wrapper-v {
    position: relative;
    height: calc(100vh - 64px);
    cursor: ew-resize;

    .adjust-button {
        position: absolute;
        right: -10px;
        top: 50%;
        transform: rotate(90deg);
    }
}
</style>
