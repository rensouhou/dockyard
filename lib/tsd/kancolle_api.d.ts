/**
 * Kancolle API Definition File
 *
 * @since 0.1.0
 */

declare module KCAPI {
  /**
   * Game API
   */
  export module API {
    /**
     * @event GET_BASE_DATA
     */
    export interface GetBaseData {
      api_basic?: PlayerProfile;
      api_combined_flag: number;
      api_deck_port: Array<Fleet>;
      api_event_object?: EventObject;
      api_log: ApiLog;
      api_material: Array<Material>;
      api_ndock: Array<RepairDock>;
      api_p_bgm_id: number;
      api_parallel_quest_count: number;
      api_ship: Array<Ship>;
    }

    /**
     * @event GET_SHIP
     * @path /api_req_kousyou/getship
     */
    export interface GetShip {
      api_id: number;
      api_kdock: Array<ConstructionDock>;
      api_kdock_id: number; // POST
      api_ship: Ship;
      api_ship_id: number;
      api_slotitem: Array<Object>
    }

    /**
     * @event GET_FLEET_DATA
     * @path /api_get_member/deck
     */
    export interface GetFleetData extends Array<Fleet> {}

    /**
     * @event GET_OPPONENT_INFO
     * @path /api/req/member/get_practice_enemyinfo
     */
    export interface GetOpponentInfo extends OpponentInfo {}

    /**
     * @event api/IMPROVE_ITEM_RESULT
     * @path /api_req_kousyou/remodel_slot
     */
    export interface ImproveItemResult {
      api_after_material: Array<number>;  // @todo Fix me into a proper material type
      api_after_slot: SlotItem;
      api_remodel_flag: number;
      api_remodel_id: Array<number>;
      api_voice_id: number;
      api_voice_ship_id: number;
    }

    /**
     * @event LOAD_FLEET_PRESET
     * @path /api_req_hensei/preset_select
     *
     * Response identical to that of what a fleet looks like.
     */
    export interface LoadFleetPreset extends Fleet {}

    /**
     * @event GET_SORTIE_CONDITIONS
     * @path /api_get_member/sortie_conditions
     */
    export interface GetSortieConditions {
      api_war: {
        api_lose: string;
        api_rate: string;
        api_win: string;
      };
    }

    /**
     * @event GET_MAP_CELL
     * @path /api_get_member/mapcell
     */
    export interface GetMapCell extends Array<MapCell> {}

      /**
       * @
       */
    export interface StartSortie {

      }
  }

  // SORTIES

  // Sortie conditions

  // Single map cell
  interface MapCell {
    api_id: number;
    api_passed: number;
  }

  interface PlayerProfile {
    api_active_flag: number;
    api_comment: string;
    api_commend_id: string;
    api_count_deck: number;
    api_count_kdock: number;
    api_count_ndock: number;
    api_experience: number;
    api_fcoin: number;
    api_firstflag: number;
    api_fleetname?: any;
    api_furniture: Array<number>;
    api_large_dock: number;
    api_level: number;
    api_max_chara: number;
    api_max_kagu: number;
    api_max_slotitem: number;
    api_medals: number;
    api_member_id: (string | number);
    api_ms_count: number;
    api_ms_success: number;
    api_nickname: string;
    api_nickname_id: string;
    api_playtime: number;
    api_pt_challenged: number;
    api_pt_challenged_win: number;
    api_pt_lose: number;
    api_pt_win: number;
    api_pvp: Array<number>;
    api_rank: number;
    api_st_lose: number;
    api_st_win: number;
    api_starttime: number;
    api_tutorial: number;
    api_tutorial_progress: number;
  }

  /**
   * PVP opponent detail info
   */
  interface OpponentInfo {
    api_cmt: string;      // As opposed to `api_comment` in `PlayerProfile`
    api_cmt_id: string;
    api_deck: any;
    api_deckname: string;
    api_deckname_id: string;
    api_experience: Array<number>;
    api_friend: number;
    api_furniture: number;
    api_level: number;
    api_member_id: number;
    api_nickname: string;
    api_nickname_id: string;
    api_rank: number;
    api_ship: Array<number>;      // ships/maxships
    api_slotitem: Array<number>;  // slotitems/maxslotitems
  }

  interface Fleet {
    api_flagship: string;
    api_id: number;
    api_member_id: number;
    api_mission: Array<number>;
    api_name: string;
    api_name_id: string;
    api_ship: Array<number>;
  }

  interface EventObject {
    api_m_flag?: any
  }

  interface ApiLog {
    api_message: string;
    api_no: number;
    api_state: string;
    api_type: string;
  }

  interface Material {
    api_id: number;
    api_member_id: number;
    api_value: number;
  }

  /**
   * @term api/ndock
   */
  interface RepairDock {
    api_complete_time: number;
    api_complete_time: string;
    api_id: number;
    api_item1: number;
    api_item2: number;
    api_item3: number;
    api_item4: number;
    api_member_id: number;
    api_ship_id: number;
    api_state: number;
  }

  /**
   * @term api/kdock
   */
  interface ConstructionDock {
    api_complete_time: number;
    api_complete_time_str: string;
    api_created_ship_id: number;
    api_id: number;
    api_item1: number;
    api_item2: number;
    api_item3: number;
    api_item4: number;
    api_item5: number;
    api_member_id: number;
    api_state: number;
  }

  interface Ship {
    api_backs: number;
    api_bull: number;
    api_cond: number;
    api_exp: Array<number>;
    api_fuel: number;
    api_id: number;
    api_kaihi: Array<number>;
    api_karyoku: Array<number>;
    api_kyouka: Array<number>;
    api_leng: number;
    api_locked: number;
    api_locked_equip: number;
    api_lucky: Array<number>;
    api_lv: number;
    api_maxhp: number;
    api_ndock_item: Array<number>;
    api_ndock_time: number;
    api_nowhp: number;
    api_onslot: Array<number>;
    api_raisou: Array<number>;
    api_sakuteki: Array<number>;
    api_sally_area: number;
    api_slot: Array<number>;
    api_slot_ex: number;
    api_slotnum: number;
    api_sortno: number;
    api_soukou: Array<number>;
    api_srate: number;
    api_taiku: Array<number>;
    api_taisen: Array<number>;
  }

  // Remodel done
  // @fixme
  interface SlotItem {
    api_id: number;
    api_level: number;
    api_locked: number;
    api_slotitem_id: number;
  }
}

