// priority: 0

StartupEvents.registry('item', event => {

	function item ( id, sequenced, group, displayName, maxStackSize, texture, unfinishedTexture, glow ) {

		sequenced = sequenced ? sequenced : false
		group = group ? group : 'kubejs'
		maxStackSize = maxStackSize ? maxStackSize : 64
		glow = glow ? glow : false
		texture = texture ? texture : `kubejs:item/${id}`
		unfinishedTexture = unfinishedTexture ? unfinishedTexture : `kubejs:item/unfinished_${id}`
		displayName = displayName ? displayName : capitalize(id.replace(/_/g, ' '))

		event.create(id)
		.displayName(displayName)
		.group(group)
		.maxStackSize(maxStackSize)
		.texture(texture)
		.glow(glow)

		if (!sequenced) {
			return
		}

		event.create(`unfinished_${id}`, 'create:sequenced_assembly')
		.displayName(`Unfinished ${displayName}`)
		.group(group)
		.maxStackSize(maxStackSize)
		.texture(unfinishedTexture)
		.glow(glow)

	}

	item('legal_gun_parts', true, null, null, 16)
	item('illegal_gun_parts', true, null, null, 16)

	item('gun_handle', true)

	item('gun_barrel_basic', false, null, 'Basic Gun Barrel')
	item('gun_barrel_advanced', false, null, 'Advanced Gun Barrel')

	item('gun_chamber_basic', true, null, 'Gun Chamber')
	item('gun_chamber_rotating', true, null, 'Revolving Gun Chamber')

	item('filter_base', false, null, 'Air Filter (Base)')
	item('ultrafine_filter_base', false, null, 'Ultrafine Air Filter (Base)')

	var pollutants = ['carbon', 'dust', 'sulfur']

	pollutants.forEach(pollutant => {
		item(`filter_${pollutant}`, false, null, `Air Filter (${capitalize(pollutant)})`)
		item(`ultrafine_filter_${pollutant}`, false, null, `Ultrafine Air Filter (${capitalize(pollutant)})`)

		item(`dirty_filter_${pollutant}`, false, null, `Dirty Air Filter (${capitalize(pollutant)})`)
		item(`dirty_ultrafine_filter_${pollutant}`, false, null, `Dirty Ultrafine Air Filter (${capitalize(pollutant)})`)
	})

})

StartupEvents.registry('block', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})

function capitalize(string){
    return string[0].toUpperCase() + string.slice(1)
}