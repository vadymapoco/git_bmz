<template>
	<div class="form-group">
        <label>{{ name }}</label>
        <span v-if="activated" class="fa" :class="classes"></span>
        <input type="text" 
        	   class="form-control"
        	   :value="value"
        	   @input="onInput"
        	   >
    </div>

</template>

<script>
	export default {
		props: ['name', 'value', 'pattern'],
			data(){
				return {
					activated: false
				};
			},
		computed: {
			valid(){
				return this.pattern.test(this.value);
			},
			classes(){
				return this.valid ? 
						'fa-check-circle text-success' :
						 'fa-exclamation-circle text-danger';
			}
		},
		watch: {
			valid(){
				this.$emit('valid', {
					status: this.valid
				});
			}
		},
		methods: {
			onInput(e){
				this.activated = true;
				this.$emit('change', {
					value: e.target.value
				});
			}
		}


	}

</script>