interface ApiGetBaseData {
  api_basic?: ApiPlayerProfile;
  api_combined_flag: number;
  api_deck_port: Array<ApiFleet>;
  api_event_object?: ApiEventObject;
  api_log: ApiLog;
  api_material: Array<ApiMaterial>;
  api_ndock: Array<ApiRepairDock>;
  api_p_bgm_id: number;
  api_parallel_quest_count: number;
  api_ship: Array<ApiShip>;
}

interface ApiPlayerProfile {
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

interface ApiFleet {
  api_flagship: string;
  api_id: number;
  api_member_id: number;
  api_mission: Array<number>;
  api_name: string;
  api_name_id: string;
  api_ship: Array<number>;
}

interface ApiEventObject {
  api_m_flag?: any
}

interface ApiLog {
  api_message: string;
  api_no: number;
  api_state: string;
  api_type: string;
}

interface ApiMaterial {
  api_id: number;
  api_member_id: number;
  api_value: number;
}

interface ApiRepairDock {
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

interface ApiConstructionDock {

}

interface ApiShip {
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
