<template>
    <h3 class="example">This is rendered by Vue: <br/> {{ msg }}</h3>
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
