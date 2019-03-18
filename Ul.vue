<template>
	<ul>
        <li v-for="item in items">
			{{ item }}
        </li>
    </ul>

</template>
<script>
export default{
	props: {
		items: Array
		},
	created(){
		console.log('ul created');
	}
}
</script>