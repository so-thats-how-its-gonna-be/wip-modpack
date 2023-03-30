// priority: 0

StartupEvents.registry('item', event => {

	let item = (id, sequenced=false, group='kubejs', displayName=null, maxStackSize=64, texture=null, unfinishedTexture=null, glow=false) => {

		event.create(id)
		.displayName(displayName ? displayName : capitalize(id.replace(/_/g, ' ')))
		.group(group)
		.maxStackSize(maxStackSize)
		.texture(texture ? texture : `kubejs:item/${id}`)
		.glow(glow)

		if (!sequenced) {
			return
		}

		event.create(`unfinished_${id}`, 'create:sequenced_assembly')
		.displayName(`Unfinished ${displayName ? displayName : capitalize(id.replace(/_/g, ' '))}`)
		.group(group)
		.maxStackSize(maxStackSize)
		.texture(unfinishedTexture ? unfinishedTexture : `kubejs:item/unfinished_${id}`)
		.glow(glow)

	}

	item('legal_gun_parts', sequenced=true, maxStackSize=16)
	item('illegal_gun_parts', sequenced=true, maxStackSize=16)

	item('gun_handle', sequenced=true)

	item('gun_barrel_basic', displayName='Basic Gun Barrel')
	item('gun_barrel_advanced', displayName='Advanced Gun Barrel')

	item('gun_chamber_basic', displayName='Gun Chamber', sequenced=true)
	item('gun_chamber_rotating', displayName='Revolving Gun Chamber', sequenced=true)

	item('filter_base', displayName='Air Filter (Base)')
	item('ultrafine_filter_base', displayName='Ultrafine Air Filter (Base)')

	['carbon', 'dust', 'sulfur'].forEach(pollutant => {
		item(`filter_${pollutant}`, displayName=`Air Filter (${capitalize(pollutant)})`)
		item(`ultrafilter_${pollutant}`, displayName=`Ultrafine Air Filter (${capitalize(pollutant)})`)

		item(`dirty_filter_${pollutant}`, displayName=`Dirty Air Filter (${capitalize(pollutant)})`)
		item(`dirty_ultrafine_filter_${pollutant}`, displayName=`Dirty Ultrafine Air Filter (${capitalize(pollutant)})`)
	})

})

StartupEvents.registry('block', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})

function capitalize(string){
    return string[0].toUpperCase() + string.slice(1)
}