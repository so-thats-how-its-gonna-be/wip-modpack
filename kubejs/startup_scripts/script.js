// priority: 0

StartupEvents.registry('item', event => {
	event.create('legal_gun_parts').displayName('Legal Gun Parts').group('kubejs').maxStackSize(16)
	event.create('illegal_gun_parts').displayName('Illegal Gun Parts').group('kubejs').maxStackSize(16)

	event.create('unfinished_legal_gun_parts').displayName('Unfinished Legal Gun Parts').group('kubejs').maxStackSize(16)
	event.create('unfinished_illegal_gun_parts').displayName('Unfinished Illegal Gun Parts').group('kubejs').maxStackSize(16)

	event.create('filter_base').displayName('Air Filter (Base)').group('kubejs')
	event.create('ultrafine_filter_base').displayName('Ultrafine Air Filter (Base)').group('kubejs')

	var pollutants = ['carbon', 'dust', 'sulfur']

	pollutants.forEach(pollutant => {
		event.create(`filter_${pollutant}`).displayName(`Air Filter (${capitalize(pollutant)})`).group('kubejs')
		event.create(`ultrafine_filter_${pollutant}`).displayName(`Ultrafine Air Filter (${capitalize(pollutant)})`).group('kubejs')

		event.create(`dirty_filter_${pollutant}`).displayName(`Dirty Air Filter (${capitalize(pollutant)})`).group('kubejs')
		event.create(`dirty_ultrafine_filter_${pollutant}`).displayName(`Dirty Ultrafine Air Filter (${capitalize(pollutant)})`).group('kubejs')
	})

	event.create('gun_handle').displayName('Gun Handle').group('kubejs')

	event.create('gun_barrel_basic').displayName('Basic Gun Barrel').group('kubejs')
	event.create('gun_barrel_advanced').displayName('Advanced Gun Barrel').group('kubejs')
})

StartupEvents.registry('block', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})

function capitalize(string){
    return string[0].toUpperCase() + string.slice(1)
}