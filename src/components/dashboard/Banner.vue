<template>
	<v-card flat outlined :loading="loading">
		<v-card-text>
			<center>
				<h1 v-if="value" class="text--primary my-4">You have {{ value }} pending permits!</h1>
				<h1 v-else class="text--primary my-4">Good job! You have no pending permits!</h1>
			</center>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	props: {
		value: {
			type: Number,
			required: true
		},
    loading: Boolean
	}
}
</script>

<style scoped>
	h1 {
		line-height: 35px;
	}
</style>