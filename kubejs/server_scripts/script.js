// priority: 0

//#region Mod shortcut helpers
let MOD = (mod, item, amount, chance) => `${amount ? `${amount}x ` : ''}${item.startsWith('#') ? '#' : ''}${mod}:${item.replace('#', '')}${chance ? ` ${chance}%`: ''}`

let MC = (item, amount, chance) => MOD('minecraft', item, amount, chance)
let P = (item, amount, chance) => MOD('pack', item, amount, chance)
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
let AC = (item, amount, chance) => MOD('adchimneys', item, amount, chance)
let PB = (item, amount, chance) => MOD('productivebees', item, amount, chance)
//#endregion

let cgmGuns = [CGM('pistol'), CGM('rifle'), CGM('shotgun'), CGM('heavy_rifle'), CGM('assault_rifle'), CGM('machine_pistol'), CGM('mini_gun'), CGM('bazooka'), CGM('grenade_launcher')]
let honey = (amount) => amount ? Fluid.of(C('honey'), amount) : Fluid.of(C('honey'))

let itemChance = (item, chance) => Item.of(item).withChance(chance)

let path = (location) => location.replace(/:/g, '/')

var itemsa = 'minecraft:stone'

ServerEvents.recipes(event => {
	
	//#region Automation recipes

	//#region Stone breakdown

	//#region Create

	//Remove existing recipes
	event.remove({output: MC('sand'), mod: 'create'})
	event.remove({input: MC('sand'), type: C('splashing')})
	event.remove({input: MC('red_sand'), type: C('splashing')})
	event.remove({input: MC('gravel'), type: C('splashing')})
	event.remove({input: MC('cobblestone'), type: C('milling')})

	event.recipes.createCrushing([MC('cobblestone')], [MC('stone')])
	event.recipes.createCrushing([MC('gravel')], [F('#cobblestone/normal')])
	event.recipes.createCrushing([Item.of(MC('sand')).withChance(0.90)], [F('#gravel')])
	event.recipes.createCrushing([Item.of(MC('redstone')).withChance(0.05), Item.of(MC('glowstone_dust')).withChance(0.05), Item.of(SPM('sulfur')).withChance(0.05), Item.of(MC('sand')).withChance(0.15)], [MC('#sand')])
	event.recipes.createCrushing([Item.of(MC('iron_nugget')).withChance(0.15), Item.of(C('crushed_iron_ore')).withChance(0.15)], [MC('flint')])

	event.recipes.createMilling([MC('gravel')], [F('#cobblestone/normal')])
	event.recipes.createMilling([Item.of(MC('sand')).withChance(0.50), Item.of(BOP('orange_sand')).withChance(0.20), Item.of(BOP('white_sand')).withChance(0.20), Item.of(BOP('black_sand')).withChance(0.20)], [F('#gravel')])
	event.recipes.createMilling([MC('dirt'), MC('flint'), Item.of(MC('flint')).withChance(0.20), Item.of(MC('clay_ball')).withChance(0.10)], [MC('coarse_dirt')])
	event.recipes.createMilling([MC('gravel'), MC('clay_ball'), Item.of(MC('clay_ball')).withChance(0.10), Item.of(MC('dirt')).withChance(0.10)], [MC('dirt')])
	event.recipes.createMilling([Item.of(C('crushed_iron_ore')).withChance(0.1), Item.of(C('crushed_iron_ore')).withChance(0.05)], [MC('flint')])

	event.recipes.createCompacting([MC('coarse_dirt')], [F('#gravel'), MC('clay_ball'), F('#seeds'), fluidJson(MC('water'), 50)])
	event.recipes.createCompacting([MC('gravel')], [MC('flint', 5)])

	event.recipes.createSplashing([Item.of(MC('clay_ball')).withChance(0.25), Item.of(MC('clay_ball')).withChance(0.10)], [MC('#sand')])
	event.recipes.createSplashing([Item.of(MC('iron_nugget')).withChance(0.05), MC('flint'), Item.of(MC('flint')).withChance(0.25)], [F('#gravel')])

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
		MC('crimson_roots', 2),
		F('#bones')
	])

	event.shapeless(ND('soul_compost'), [
		MC('soul_soil'),
		SPM('sulfur', 3),
		MC('warped_roots', 2),
		F('#bones')
	])
	
	//#endregion

	//#region Sulfur bleaches Create schematics
	event.shapeless(MC('paper'), [
		SPM('sulfur'),
		C('empty_schematic')
	])
	//#endregion

	//#region Create Tree Fertilizer uses sulfur
	event.remove({output: C('tree_fertilizer')})
	event.shapeless(C('tree_fertilizer'), [
		SPM('sulfur'),
		MC('bone_meal', 3),
		F('#leaves')
	])
	//#endregion

	//#endregion

	//#region More potassium recipes

	//#region Vanilla tnt uses potassium and gunpowder

	event.remove({output: MC('tnt')})
	event.shapeless(MC('tnt'), [
		SPM('potassium'),
		MC('gunpowder', 4),
		MC('sand')
	])

	//#endregion

	//#endregion

	//#region CGM recipes

	event.remove({mod: 'cgm'})

	event.shapeless(CGM('workbench'), [
		MC('crafting_table'),
		AC('wooden_paintbrush')
	])

	//#region Gun recipes

	event.shaped(Item.of(CGM('pistol')), [
		'SSB',
		'HD ',
		'   '
	], {
		S: F("#ingots/steel"),
		B: KJS("gun_barrel_basic"),
		D: F("#dusts/diamond"),
		H: KJS("gun_handle")
	})

	// Allow crafting each gun out of itself to recolor it
	cgmGuns.forEach(gun => {
		cgmWorkBench(event, gun, [gun])
	})

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

	event.shapeless(CGM('missile', 4), [
		F('#plates/steel'),
		MC('gunpowder', 4),
		F('#dyes/red')
	])

	//#endregion

	//#region Grenade recipes

	event.shapeless(CGM('grenade'), [
		F('#ingots/iron'),
		MC('gunpowder', 4),
		SPM('potassium')
	])

	event.shapeless(CGM('stun_grenade'), [
		F('#ingots/iron'),
		MC('gunpowder', 4),
		SPM('potassium'),
		MC('#sand')
	])

	//#endregion

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
	var pollutantItems = [MC('charcoal'), MC('sand'), SPM('sulfur')]
	var filterTypes = ['filter', 'ultrafine_filter']

	pollutants.forEach(pollutant => {
		filterTypes.forEach(filterType => {

			var ultrafine = filterType == 'ultrafine_filter'

			event.stonecutting(KJS(`${filterType}_${pollutant}`), KJS(`${filterType}_base`))

			event.recipes.createMixing([KJS(`${filterType}_${pollutant}`), Fluid.of(POTR('polluted_water'), ultrafine ? 270 : 90)], [KJS(`dirty_${filterType}_${pollutant}`), Fluid.of(MC('water'), ultrafine ? 300 : 100)])

			event.shapeless(KJS(`${filterType}_base`), [
				KJS(`${filterType}_${pollutant}`),
				SPM('sulfur'),
				F('#filter_base_materials')
			])
			
			event.recipes.createSplashing([KJS(`${filterType}_${pollutant}`), Item.of(pollutantItems[pollutants.indexOf(pollutant)]).withChance(ultrafine ? 0.75 : 0.25)], [KJS(`dirty_${filterType}_${pollutant}`)])
		})
	})

	event.recipes.createSplashing([KJS('filter_carbon'), Item.of(MC('charcoal')).withChance(0.25)], [KJS('dirty_filter_carbon')])
	event.recipes.createSplashing([KJS('filter_dust'), Item.of(MC('sand')).withChance(0.25)], [KJS('dirty_filter_dust')])
	event.recipes.createSplashing([KJS('filter_sulfur'), Item.of(SPM('sulfur')).withChance(0.25)], [KJS('dirty_filter_sulfur')])

	event.recipes.createSplashing([KJS('ultrafine_filter_carbon'), Item.of(MC('charcoal')).withChance(0.75), Item.of(MC('charcoal')).withChance(0.25)], [KJS('dirty_ultrafine_filter_carbon')])
	event.recipes.createSplashing([KJS('ultrafine_filter_dust'), Item.of(MC('sand')).withChance(0.75), Item.of(MC('sand')).withChance(0.25)], [KJS('dirty_ultrafine_filter_dust')])
	event.recipes.createSplashing([KJS('ultrafine_filter_sulfur'), Item.of(SPM('sulfur')).withChance(0.75), Item.of(SPM('sulfur')).withChance(0.25)], [KJS('dirty_ultrafine_filter_sulfur')])

	//#endregion

	//#region Gun parts

	event.shapeless(KJS('gun_handle'), [
		F('#ingots/steel', 2),
		F('#rods/iron', 2),
		C('sand_paper')
	]).damageIngredient(Item.of(C('sand_paper')))

	itemsa = KJS('unfinished_gun_handle')
	event.recipes.sequencedAssembly( 
		[ Item.of(KJS('gun_handle')) ], 
		F('#ingots/steel'), 
		[
			event.recipes.createDeploying(itemsa, [itemsa, F('#rods/iron')]),
			event.recipes.createSandPaperPolishing(itemsa, [itemsa])
		]).transitionalItem(itemsa)

	event.shaped(KJS('gun_barrel_basic'), [
		'SSR'
	], {
		S: F('#ingots/steel'),
		R: F('#rods/iron')
	})

	event.recipes.mechanicalCrafting(KJS('gun_barrel_advanced'), [
		'SSRRB'
	], {
		S: F('#ingots/steel'),
		R: F('#rods/iron'),
		B: KJS('gun_barrel_basic')
	})

	itemsa = KJS('unfinished_gun_chamber_basic')
	event.recipes.createSequencedAssembly(
		[ Item.of(KJS('gun_chamber_basic')) ],
		F('#ingots/steel'), [
			event.recipes.createPressing(itemsa, [itemsa]),
			event.recipes.createPressing(itemsa, [itemsa]),
			event.recipes.createCutting(itemsa, [itemsa]),
			event.recipes.createSplashing([itemsa], [itemsa])
		]).transitionalItem(itemsa).loops(4)

	itemsa = KJS('unfinished_gun_chamber_rotating')
	event.recipes.createSequencedAssembly(
		[ Item.of(KJS('gun_chamber_rotating')) ],
		KJS('gun_chamber_basic'), [
			event.recipes.createPressing(itemsa, [itemsa]),
			event.recipes.createDeploying(itemsa, [itemsa, F('#dusts/obsidian')]),
			event.recipes.createPressing(itemsa, [itemsa]),
			event.recipes.createCutting(itemsa, [itemsa]),
			event.recipes.createSplashing([itemsa], [itemsa])
		]).transitionalItem(itemsa).loops(12)

	itemsa = KJS('unfinished_legal_gun_parts')
	event.recipes.sequencedAssembly(
		[ Item.of(KJS('legal_gun_parts')) ],
		F('#plates/steel'), [
			event.recipes.createCutting(itemsa, [itemsa]).processingTime(50),
			event.recipes.createDeploying(itemsa, [itemsa, F('#nuggets/iron')]),
			event.recipes.createPressing(itemsa, [itemsa])
		]).transitionalItem(itemsa).loops(5)

	itemsa = KJS('unfinished_illegal_gun_parts')
	event.recipes.sequencedAssembly(
		[ Item.of(KJS('illegal_gun_parts')) ],
		KJS('legal_gun_parts'), [
			event.recipes.createCutting(itemsa, [itemsa]).processingTime(100),
			event.recipes.createDeploying(itemsa, [itemsa, F('#ingots/iron')]),
			event.recipes.createPressing(itemsa, [itemsa]),
			event.recipes.createDeploying(itemsa, [itemsa, F('#rods/iron')])
		]).transitionalItem(itemsa).loops(5)

	//#endregion

	//#endregion

	//#region Productive bees recipes

	//#region Compat

	event.remove({mod: 'productivebees', type: C('mixing')})
	event.remove({output: PB('milk_bottle')})

	event.replaceInput({}, Fluid.of(PB('honey')), Fluid.of(C('honey')))
	event.replaceInput({}, Fluid.of(PB('flowing_honey')), Fluid.of(C('honey')))
	event.replaceOutput({}, Fluid.of(PB('honey')), Fluid.of(C('honey')))

	event.replaceInput({}, PB('honey_bucket'), C('honey_bucket'))
	event.replaceOutput({}, PB('honey_bucket'), C('honey_bucket'))

	//#endregion

	//#region Upgrade removal

	let pbUpgrades = ['anti_teleport', 'base', 'bee_sampler', 'breeding', 'comb_block', 'filter', 'not_babee', 'productivity', 'range', 'simulator', 'time']
	pbUpgrades.forEach(upgrade => {
		event.remove({output: PB(`upgrade_${upgrade}`)})
	})

	//#endregion

	//#region Testing

	pbCentrifuge(event, pbNbtItem('test', 'comb'), [
		honey(100),
		itemChance(F('#wax'), 0.5),
		itemChance(CA('festive_spool'), 0.05)
	])

	event.recipes.createMixing([pbNbtItem('test', 'comb')], [
		honey(50),
		itemChance(F('#wax'), 0.3),
		itemChance(CA('festive_spool'), 0.01)
	]).heated()

	pbBeeProduce(event, 'test', [pbNbtItem('test', 'comb')])

	//#endregion

	//#endregion

})

ServerEvents.tags('item', event => {
	
	//#region Unification fixes

	event.remove(F('plates'), CRA('zinc_sheet'))

	event.removeAllTagsFrom(PB('milk_bottle'))
	event.get(F('bottles/milk')).add(PB('milk_bottle')).add(FD('milk_bottle'))

	//#endregion

	//#region Custom item tags
	event.get(F('filter_base_materials')).add(MC('paper')).add(FD('canvas'))
	//#endregion

})

ServerEvents.highPriorityData(event => {
	
	pbRegisterBee(event, 'test', {
		primaryColor: '#AAFF00',
		secondaryColor: '#EE4B2B',
		particleColor: '#ffffff',
		flowerBlock: CRA('connector'),
		size: 1.0
	})

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

//#region Productive Bees compat

function pbBeeBreeding(event, parent1, parent2, results){
	event.custom({
		type: PB('bee_breeding'),
		parent1: parent1,
		parent2: parent2,
		offspring: results
	})}

function pbBeeConversion(event, parent, result, item){
	event.custom({
		type: PB('bee_conversion'),
		source: parent,
		result: result,
		item: Item.of(item).toJson()
	})}

function pbBeeProduce(event, bee, results){
	event.custom({
		type: PB('advanced_beehive'),
		ingredient: bee,
		results: formatMaterials(results)
	})}

function pbCentrifuge(event, item, outputs){
	event.custom({
		type: PB('centrifuge'),
		ingredient: item,
		outputs: formatMaterials(outputs)
	})}

function pbBlockConversion(event, bee, block, result, chance){
	event.custom({
		type: PB('block_conversion'),
		bee: bee,
		chance: chance ? chance * 100 : 100, // Chance input is a decimal, but the json expects a percentage
		from: {Name: block},
		to: {Name: result}
	})}

function pbRegisterBee(event, name, json){
	event.addJson(KJS(`productivebees/${name}`), json)
}

function pbNbtItem(entity, item_type){
	switch(item_type){
		case 'honeycomb':
		case 'comb':
		case 'c':
			item_type = 'configurable_honeycomb'
			break
	}
	return {
		type: F('nbt'),
		item: PB(item_type),
		nbt: {
			EntityTag: {
				type: PB(entity)
			}
		}
	}
}

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