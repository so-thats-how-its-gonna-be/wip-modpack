// priority: 0

//#region Mod shortcut helpers
let MOD = (mod, item, amount, chance) => `${amount ? `${amount}x ` : ''}${item.startsWith('#') ? '#' : ''}${mod}:${item.replace('#', '')}${chance ? ` ${chance}%`: ''}`

let MC = (item, amount, chance) => MOD('minecraft', item, amount, chance)
let F = (item, amount, chance) => MOD('forge', item, amount, chance)
let C = (item, amount, chance) => MOD('create', item, amount, chance)
let CA = (item, amount, chance) => MOD('alloyed', item, amount, chance)
let KJS = (item, amount, chance) => MOD('kubejs', item, amount, chance)
let FD = (item, amount, chance) => MOD('farmersdelight', item, amount, chance)
let AM = (item, amount, chance) => MOD('alexsmobs', item, amount, chance)
let CGM = (item, amount, chance) => MOD('cgm', item, amount, chance)
let SAR = (item, amount, chance) => MOD('someassemblyrequired', item, amount, chance)
let FR = (item, amount, chance) => MOD('farmersrespite', item, amount, chance)
let ND = (item, amount, chance) => MOD('nethersdelight', item, amount, chance)
let BOP = (item, amount, chance) => MOD('biomesoplenty', item, amount, chance)
let SPM = (item, amount, chance) => MOD('sulfurpotassiummod', item, amount, chance)
let CRA = (item, amount, chance) => MOD('createaddition', item, amount, chance)
let CBC = (item, amount, chance) => MOD('createbigcannons', item, amount, chance)
let POTR = (item, amount, chance) => MOD('adpother', item, amount, chance)
//#endregion

ServerEvents.recipes(event => {
	
	//#region Automation recipes

	//#region Create

	//#region Stone breakdown

	event.remove({output: MC('sand'), mod: 'create'})

	event.remove({input: MC('sand'), type: C('splashing')})
	event.remove({input: MC('red_sand'), type: C('splashing')})
	event.remove({input: MC('gravel'), type: C('splashing')})

	event.remove({input: MC('cobblestone'), type: C('milling')})

	createCrushing(event, [MC('cobblestone')], [MC('stone')], 50)
	createMilling(event, [MC('gravel')], [F('#cobblestone/normal')], 250)
	createCrushing(event, [MC('gravel')], [F('#cobblestone/normal')], 50)
	createMilling(event, [MC('sand', 1, 50), BOP('orange_sand', 1, 20), BOP('white_sand', 1, 20), BOP('black_sand', 1, 20)], [F('#gravel')], 250)
	createCrushing(event, [MC('sand', 1, 90)], [F('#gravel')], 50)
	createMilling(event, [MC('redstone', 1, 0.5), MC('glowstone_dust', 1, 0.5), SPM('sulfur', 1, 0.5), MC('sand', 1, 10)], [MC('#sand')], 250)

	createCompacting(event, [MC('coarse_dirt')], [F('#gravel'), MC('clay_ball'), F('#seeds'), fluidJson(MC('water'), 50)])
	createMilling(event, [MC('dirt'), MC('flint'), MC('flint', 1, 20), MC('clay_ball', 1, 10)], [MC('coarse_dirt')], 250)

	createMilling(event, [MC('gravel'), MC('clay_ball'), MC('clay_ball', 1, 10), MC('dirt', 1, 10)], [MC('dirt')], 250)

	createSplashing(event, [MC('clay_ball', 1, 25), MC('clay_ball', 1, 10)], [MC('#sand')])
	createSplashing(event, [MC('iron_nugget', 1, 0.5), MC('flint'), MC('flint', 1, 25)], [F('#gravel')])

	//#endregion

	//#endregion

	//#endregion

	//#region More sulfur recipes

	//#region FD Compost uses sulfur
	event.remove({output: FD('organic_compost')})
	event.remove({output: ND('soul_compost')})

	event.shapeless(FD('organic_compost'), [
		MC('#dirt'),
		SPM('sulfur', 2),
		MC('bone_meal', 2),
		MC('rotten_flesh')
	])

	event.shapeless(ND('soul_compost'), [
		MC('soul_soil'),
		SPM('sulfur', 3),
		MC('bone_meal', 2),
		F('#bones')
	])
	
	//#endregion

	//#region Sulfur bleaches Create schematics
	event.shapeless(MC('paper'), [
		SPM('sulfur', 1),
		C('empty_schematic')
	])
	//#endregion

	//#region Create Tree Fertilizer uses sulfur
	event.remove({output: C('tree_fertilizer')})
	event.shapeless(C('tree_fertilizer'), [
		SPM('sulfur', 1),
		MC('bone_meal', 3),
		F('#leaves')
	])
	//#endregion

	//#endregion

	//#region More potassium recipes

	//#region Vanilla tnt uses potassium and gunpowder
	event.remove({output: MC('tnt')})
	event.shapeless(MC('tnt'), [
		SPM('potassium', 1),
		MC('gunpowder', 4),
		MC('sand')
	])
	//#endregion

	//#endregion

	//#region CGM recipes

	event.remove({mod: 'cgm'})

	//#region Gun recipes

	// Pistol is the only gun recipe that wont take any gun parts
	event.shapeless(CGM("pistol"), [
    F("#ingots/steel", 4),
    KJS("gun_barrel_basic"),
    F("#dusts/diamond"),
    KJS("gun_handle")
  	])

	//#endregion

	//#region Ammo recipes

	event.shapeless(CGM('basic_bullet', 16), [
		F('#ingots/iron'),
		MC('gunpowder', 3),
		F('#nuggets/copper', 2)
	])

	event.shapeless(CGM('advanced_bullet', 16), [
		F('#ingots/steel'),
		MC('gunpowder', 4),
		F('#nuggets/copper', 3)
	])

	event.shapeless(CGM('shell', 16), [
		F('#plates/steel'),
		MC('gunpowder', 3),
		F('#nuggets/gold', 2)
	])

	//#endregion

	//#endregion

	//#region Custom item recipes
	
	//#region Air filters

	event.shapeless(KJS('filter_base'), [
		F('#filter_base_materials'),
		MC('stick', 4),
		MC('string', 4)
	])

	event.shapeless(KJS('ultrafine_filter_base'), [
		F('#filter_base_materials', 3),
		F('#rods/iron', 4),
		MC('string', 2)
	])

	var pollutants = ['carbon', 'dust', 'sulfur']

	pollutants.forEach(pollutant => {
		event.stonecutting(KJS(`filter_${pollutant}`), KJS('filter_base'))
		event.stonecutting(KJS(`ultrafine_filter_${pollutant}`), KJS('ultrafine_filter_base'))

		createMixing(event, [KJS(`filter_${pollutant}`), fluidJson(POTR('polluted_water'), 90)], [KJS(`dirty_filter_${pollutant}`), fluidJson(MC('water'), 100)])
		createMixing(event, [KJS(`ultrafine_filter_${pollutant}`), fluidJson(POTR('polluted_water'), 270)], [KJS(`dirty_ultrafine_filter_${pollutant}`), fluidJson(MC('water'), 300)])

		event.shapeless(KJS('filter_base'), [
			KJS(`filter_${pollutant}`),
			SPM('sulfur'),
			F('#filter_base_materials')
		])

		event.shapeless(KJS('ultrafine_filter_base'), [
			KJS(`ultrafine_filter_${pollutant}`),
			SPM('sulfur', 3),
			F('#filter_base_materials', 3)
		])
	})

	createSplashing(event, [KJS('filter_carbon'), MC('charcoal', 1, 25)], [KJS('dirty_filter_carbon')])
	createSplashing(event, [KJS('filter_dust'), MC('sand', 1, 25)], [KJS('dirty_filter_dust')])
	createSplashing(event, [KJS('filter_sulfur'), SPM('sulfur', 1, 25)], [KJS('dirty_filter_sulfur')])

	createSplashing(event, [KJS('ultrafine_filter_carbon'), MC('charcoal', 1, 75), MC('charcoal', 1, 25)], [KJS('dirty_ultrafine_filter_carbon')])
	createSplashing(event, [KJS('ultrafine_filter_dust'), MC('sand', 1, 75), MC('sand', 1, 25)], [KJS('dirty_ultrafine_filter_dust')])
	createSplashing(event, [KJS('ultrafine_filter_sulfur'), SPM('sulfur', 1, 75), SPM('sulfur', 1, 25)], [KJS('dirty_ultrafine_filter_sulfur')])

	//#endregion

	//#region Gun parts

	event.shapeless(KJS('gun_handle'), [
		F('#ingots/steel', 2),
		F('#rods/iron', 2),
		C('sand_paper')
	]).damageIngredient(Item.of(C('sand_paper')))

	//#endregion

	//#endregion

})

ServerEvents.tags('item', event => {
	
	//#region Unification fixes
	event.remove(F('plates'), CRA('zinc_sheet'))
	//#endregion

	//#region Custom item tags
	event.get(F('filter_base_materials')).add(MC('paper')).add(FD('canvas'))
	//#endregion

})

//#region CGM compat
function cgmWorkBench(event, result, materials){
    event.custom({
		type: CGM('workbench'),
		materials: formatMaterials(materials),
		result: Item.of(result).toJson()
	})
}
//#endregion

//#region Create compat

//#region Mixing recipes

function createMixing(event, results, materials){
	event.custom({
		type: C('mixing'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results)
	})}

function createMixingHeated(event, results, materials){
	event.custom({
		type: C('mixing'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results),
		heatRequirement: 'heated'
	})}

function createMixingSuperHeated(event, results, materials){
	event.custom({
		type: C('mixing'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results),
		heatRequirement: 'superheated'
	})}

//#endregion

//#region Sequenced Assembly recipes
function createSequencedAssembly(event, results, startingItem, sequence, transitionalItem, loops){
	event.custom({
		type: C('sequenced_assembly'),
		ingredient: Item.of(startingItem).toJson(),
		sequence: sequence,
		transitionalItem: transitionalItem,
		loops: loops,
		results: formatMaterials(results)
	})}
//#endregion

function createCrushing(event, results, materials, processingTime){
	event.custom({
		type: C('crushing'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results),
		processingTime: processingTime
	})}

function createMilling(event, results, materials, processingTime){
	event.custom({
		type: C('milling'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results),
		processingTime: processingTime
	})}

function createMechanicalCrafting(event, result, materialPattern, materialKeys){
	event.custom({
		type: C('mechanical_crafting'),
		pattern: materialPattern,
		key: materialKeys,
		result: Item.of(result).toJson(),
		acceptMirrored: true
	})}

function createPressing(event, result, materials){
	event.custom({
		type: C('pressing'),
		ingredients: formatMaterials(materials),
		result: Item.of(result).toJson()
	})}

function createSandpaperPolishing(event, results, materials){
	event.custom({
		type: C('sandpaper_polishing'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results)
	})}

function createCompacting(event, results, materials){
	event.custom({
		type: C('compacting'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results)
	})}

function createCutting(event, results, materials, processingTime){
	event.custom({
		type: C('cutting'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results),
		processingTime: processingTime
	})}

function createDeploying(event, results, materials){
	event.custom({
		type: C('deploying'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results)
	})}

function createEmptying(event, results, materials){
	event.custom({
		type: C('emptying'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results)
	})}

function createFilling(event, results, materials){
	event.custom({
		type: C('filling'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results)
	})}

function createHaunting(event, results, materials){
	event.custom({
		type: C('haunting'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results)
	})}

function createItemApplication(event, results, materials){
	event.custom({
		type: C('item_application'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results)
	})}

function createSplashing(event, results, materials){
	event.custom({
		type: C('splashing'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(results)
	})}

//#endregion

//#region Create Additions compat

function createAdditionsRolling(event, result, material){
	event.custom({
		type: CA('rolling'),
		input: Item.of(material).toJson(),
		result: Item.of(result).toJson()
	})}

function createAdditionsLiquidBurning(event, fluid, burnTime){
	event.custom({
		type: CA('liquid_burning'),
		fluid: fluid,
		burnTime: burnTime
	})}

//#endregion

//#region Create Big Cannons compat

function createBigCannonsMelting(event, fluidResults, materials, processingTime){
	event.custom({
		type: CBC('melting'),
		ingredients: formatMaterials(materials),
		results: formatMaterials(fluidResults),
		processingTime: processingTime,
		heatRequirement: 'heated'
	})}

//#endregion

//#region Farmer's Delight compat

function fdCutting(event, result, materials, tool){
	event.custom({
		type: FD('cutting'),
		ingredients: formatMaterials(materials),
		result: Item.of(result).toJson(),
		tool: tool
	})}

function fdCooking(event, result, materials, xp, cookingTime){
	event.custom({
		type: FD('cooking'),
		recipe_book_tab: 'meals',
		ingredients: formatMaterials(materials),
		result: Item.of(result).toJson(),
		experience: xp,
		cookingtime: cookingTime
	})}

function fdCookingContainer(event, result, materials, xp, cookingTime, container){
	event.custom({
		type: FD('cooking'),
		recipe_book_tab: 'meals',
		ingredients: formatMaterials(materials),
		result: Item.of(result).toJson(),
		experience: xp,
		cookingtime: cookingTime,
		container: Item.of(container).toJson()
	})}

//#endregion

//#region Helper functions

// Format materials for custom json recipes
function formatMaterials(materials){
	var formattedMaterials = []
	materials.forEach(material => {
		formattedMaterials.push(parseIngredientToJson(material))
	})
	return formattedMaterials
}

function parseIngredientToJson(ingredient){
	// Handles edge cases and fluids
	if (typeof ingredient != 'string'){
		return ingredient
	}

	var split = ingredient.split(' ')

	if (split.length == 1){
		if (split[0].includes('#')){
			return {
				tag: split[0].replace('#', '')
			}
		} else {
			return {
				item: split[0]
			}
		}
	} else if (split.length < 3 && !ingredient.includes('%')){
		return Item.of(ingredient).toJson()
	} else if (split.length == 2 && ingredient.includes('%')){
		ingredient = '1x ' + ingredient
		split = ingredient.split(' ')
	}
	var amount = parseInt(split[0].replace('x', ''))
	var material = split[1]
	var chance = parseInt(split[2].replace('%', '')) / 100

	var output = ingredient

	if (material.includes('#')){
		output = {
			tag: material.replace('#', ''),
			count: amount,
			chance: chance
		}
	} else {
		output = {
			item: material,
			count: amount,
			chance: chance
		}
	}

	return output
}

function fluidTagJson(tag, amount){
	return {
		fluidTag: tag.replace('#', ''),
		amount: amount
	}
}

function fluidJson(fluid, amount){
	return {
		fluid: fluid,
		amount: amount
	}
}

//#endregion