<style lang="scss">
.kb-card {
	background: #fff;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	padding: 20px;
	margin-bottom: 20px;
	cursor: pointer;
	transition: box-shadow 0.3s;
	&:hover {
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
	}
}
</style>

<template>
    <div class="kb-card" @click="cardClicked">
        <div class="d-flex flex-wrap">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
	props: {
		task: {
			required: true
		}
	},
	methods: {
		cardClicked() {
			this.$emit('block-clicked', this.task)
		}
	}
}
</script>

