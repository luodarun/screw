<template>
    <div class="sidebar"><a class="important" href="">11</a></div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
@use 'sass:color';
@use 'sass:string';

// string.unquote去除引号,color.ie-hex-str将颜色值转为#AARRGGBB格式
@function rgb2hex($color) {
    @debug color.ie-hex-str($color);
    $haha: #{string.slice(color.ie-hex-str($color), 4)};
    @debug $haha;
    @return unquote('#' + $haha);
}
@debug rgb2hex(rgb(00, 00, 00));
</style>
