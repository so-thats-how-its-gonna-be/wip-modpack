// priority: 0

let MOD = (id, item) => { return item ? `${id}:${item}` : id }

let CGM = (item) => { return MOD('cgm', item) }
let PB = (item) => { return MOD('productivebees', item) }

let cgmGuns = [CGM('pistol'), CGM('rifle'), CGM('shotgun'), CGM('heavy_rifle'), CGM('assault_rifle'), CGM('machine_pistol'), CGM('mini_gun'), CGM('bazooka'), CGM('grenade_launcher')]

JEIEvents.hideItems(event => {
	event.hide(PB('honey_bucket'))
})

JEIEvents.hideFluids(event => {
	event.hide(PB('honey'))
})

JEIEvents.information(event => {
	event.add(CGM('workbench'), [
		"Used to paint guns!",
		"",
		"Cannot be used to craft guns."
	])
})

JEIEvents.removeCategories(event => {
	event.remove('cgm:workbench')
})

ItemEvents.tooltip(event => {
	event.add(cgmGuns, [
		"",
		"Paint in the Gun Painting Table!"
	])

	event.add([CGM('workbench')], [
		"",
		"Use to paint guns!"
	])
})