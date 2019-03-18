<template>
	<div class="container">
		<h1> Menu 2 </h1>
		<hr>
		<div>
  <b-button-group>
    <b-button>Button 1</b-button>
    <b-button>Button 2</b-button>
    <b-dropdown right text="Menu">
      <b-dropdown-item>Item 1</b-dropdown-item>
      <b-dropdown-item>Item 2</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>Item 3</b-dropdown-item>
    </b-dropdown>
    <b-button>Button 3</b-button>
    <b-dropdown right split text="Split Menu">
      <b-dropdown-item>Item 1</b-dropdown-item>
      <b-dropdown-item>Item 2</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>Item 3</b-dropdown-item>
    </b-dropdown>
  </b-button-group>
</div>

 <b-btn v-b-popover.hover="'I am popover content!'" title="Popover Title">
    Hover Me
  </b-btn>



	</div>

</template>



<script>

import bContainer from 'bootstrap-vue/es/components/layout/container';
import bPopover from 'bootstrap-vue/es/components/popover/popover';
import bButton from 'bootstrap-vue/es/components/button/button';
import bButtonToolbar from 'bootstrap-vue/es/components/button-toolbar/button-toolbar';
import bButtonGroup from 'bootstrap-vue/es/components/button-group/button-group';
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown';
import bDropdownitem from 'bootstrap-vue/es/components/dropdown/dropdown-item';


export default{
		components: {
    
    'b-container' : bContainer,
    'b-popover' : bPopover,
    'b-button' : bButton,
    'b-button-toolbar' : bButtonToolbar,
    'b-button-group' : bButtonGroup,
    'b-dropdown': bDropdown,
    'b-dropdown-item' : bDropdownitem
  }
	
}
</script>

<style scoped>

	
		
</style>