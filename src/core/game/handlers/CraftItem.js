/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import R from 'ramda';
import BaseHandler from './BaseHandler';
import Actions from '../constants/Actions';

export default class CraftItem extends BaseHandler {
  handleState() {
    console.log('CraftItem');
    console.log('  this.method =>', this.method);

    const { GET, POST } = this.method;

    let slotItem = GET.api_slot_item || {};
    let created = R.T() == GET.api_create_flag;
    let penguin = R.F() == GET.api_shizai_flag;   // Was devmats used?

    let materialsUsed = {
      fuel: POST.api_item1,
      ammo: POST.api_item2,
      steel: POST.api_item3,
      bauxite: POST.api_item4
    };

    let resultingItem = {
      type: GET.api_type3,
      id: slotItem.api_id,
      itemId: slotItem.api_slotitem_id,
      penguin: penguin,
      created: created
    };

    let [ fuel, ammo, steel, bauxite, instantConstruction, instantRepair, developmentMaterials, improvementMaterials ] = GET.api_material;
    let resources = {
      fuel,
      ammo,
      steel,
      bauxite,
      instantConstruction,
      instantRepair,
      developmentMaterials,
      improvementMaterials
    };
    let toInt = R.map(parseInt);

    this.dispatchState(Actions.CREATE_ITEM, {
      materialsUsed: toInt(materialsUsed),
      item: resultingItem
    });
  }
}