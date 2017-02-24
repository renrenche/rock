<template>
    <h3 class="example">下内容由 Vue 渲染<br/> {{ msg }}</h3>
</template>

<script>
export default {
    data() {
        return {
            msg: 'hello, <%= name %>',
        };
    }
};
</script>

<style>
    .example {
        color: #fd521d;
    }
</style>
