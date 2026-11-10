const MUSIC_TRACKS = [
  { src: "https://assets.modded-evolve.com/audio/music/Credits/Evolve_Credits_01.wav", title: "Evolve Credits 01" },
  { src: "https://assets.modded-evolve.com/audio/music/drop_ship/MinionWaveStart_Hunter_01_V01.wav", title: "Minionwavestart Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/drop_ship/MinionWaveStart_Hunter_02_V01.wav", title: "Minionwavestart Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/drop_ship/minionwavestart_hunter_03_v01.wav", title: "Minionwavestart Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/drop_ship/minionwavestart_monster_01_v01.wav", title: "Minionwavestart Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/drop_ship/minionwavestart_monster_02_v01.wav", title: "Minionwavestart Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/drop_ship/minionwavestart_monster_03_v01.wav", title: "Minionwavestart Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/menu/loadingscreen_01.wav", title: "Loadingscreen 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_desertaquatic_1.wav", title: "Merc Biome Desertaquatic 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_desertdead_1.wav", title: "Merc Biome Desertdead 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_desertplains_1.wav", title: "Merc Biome Desertplains 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_desertrocky_1.wav", title: "Merc Biome Desertrocky 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_forestaquatic_1.wav", title: "Merc Biome Forestaquatic 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_forestdead_1.wav", title: "Merc Biome Forestdead 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_forestgrasslands_1.wav", title: "Merc Biome Forestgrasslands 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_forestjungle_1.wav", title: "Merc Biome Forestjungle 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_forestkelp_1.wav", title: "Merc Biome Forestkelp 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_forestswamp_1.wav", title: "Merc Biome Forestswamp 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_icedead_1.wav", title: "Merc Biome Icedead 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_iceforest_1.wav", title: "Merc Biome Iceforest 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_lavarocky_1.wav", title: "Merc Biome Lavarocky 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_lavaswamp_1.wav", title: "Merc Biome Lavaswamp 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/amb_merc_biome_settlement_1.wav", title: "Merc Biome Settlement 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/m_evolve_01.wav", title: "Evolve 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/m_merc_encounter_01.wav", title: "Merc Encounter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/m_merc_encounter_high_01.wav", title: "Merc Encounter High 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/m_merc_encounter_low_01.wav", title: "Merc Encounter Low 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/m_merc_stealth_01.wav", title: "Merc Stealth 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/m_merc_tracking_01.wav", title: "Merc Tracking 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_circling_birds_1.wav", title: "Circling Birds 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_circling_birds_2.wav", title: "Circling Birds 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_circling_birds_3.wav", title: "Circling Birds 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_defend_hunterreinforcements_hunter_01.wav", title: "Defend Hunterreinforcements Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_defend_minionwave_start_hunter_01.wav", title: "Defend Minionwave Start Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_defend_minionwave_start_hunter_02.wav", title: "Defend Minionwave Start Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_defend_minionwave_start_hunter_03.wav", title: "Defend Minionwave Start Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_defend_objective01_complete_hunter_01.wav", title: "Defend Objective01 Complete Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_defend_objective01_complete_hunter_02.wav", title: "Defend Objective01 Complete Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_defend_round_start_hunter_01.wav", title: "Defend Round Start Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_encounter_intro_hunter_01.wav", title: "Encounter Intro Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_encounter_intro_hunter_02.wav", title: "Encounter Intro Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_encounter_intro_hunter_03.wav", title: "Encounter Intro Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_encounter_outro_hunter_01.wav", title: "Encounter Outro Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_encounter_outro_hunter_02.wav", title: "Encounter Outro Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_encounter_outro_hunter_03.wav", title: "Encounter Outro Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_evolve_01.wav", title: "Evolve 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_evolve_end_01.wav", title: "Evolve End 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_evolve_intro_01.wav", title: "Evolve Intro 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majornegative_01.wav", title: "Majornegative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majornegative_02.wav", title: "Majornegative 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majornegative_03.wav", title: "Majornegative 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majornegative_04.wav", title: "Majornegative 04" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majornegative_05.wav", title: "Majornegative 05" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majornegative_06.wav", title: "Majornegative 06" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majorpositive_01.wav", title: "Majorpositive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majorpositive_02.wav", title: "Majorpositive 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majorpositive_03.wav", title: "Majorpositive 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majorpositive_04.wav", title: "Majorpositive 04" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majorpositive_05.wav", title: "Majorpositive 05" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_majorpositive_06.wav", title: "Majorpositive 06" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_armor_gone_1.wav", title: "Merc Armor Gone 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_armor_gone_2.wav", title: "Merc Armor Gone 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_armor_gone_3.wav", title: "Merc Armor Gone 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desertaquatic_end_1.wav", title: "Merc Biome Desertaquatic End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desertaquatic_start_1.wav", title: "Merc Biome Desertaquatic Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desertdead_end_1.wav", title: "Merc Biome Desertdead End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desertdead_start_1.wav", title: "Merc Biome Desertdead Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desertplains_end_1.wav", title: "Merc Biome Desertplains End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desertplains_start_1.wav", title: "Merc Biome Desertplains Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desertrocky_end_1.wav", title: "Merc Biome Desertrocky End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desertrocky_start_1.wav", title: "Merc Biome Desertrocky Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_incidental_1.wav", title: "Merc Biome Desert Incidental 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_incidental_2.wav", title: "Merc Biome Desert Incidental 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_incidental_3.wav", title: "Merc Biome Desert Incidental 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_incidental_4.wav", title: "Merc Biome Desert Incidental 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_incidental_5.wav", title: "Merc Biome Desert Incidental 5" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_incidental_6.wav", title: "Merc Biome Desert Incidental 6" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_incidental_7.wav", title: "Merc Biome Desert Incidental 7" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_incidental_8.wav", title: "Merc Biome Desert Incidental 8" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_intro_1.wav", title: "Merc Biome Desert Intro 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_intro_2.wav", title: "Merc Biome Desert Intro 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_intro_3.wav", title: "Merc Biome Desert Intro 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_intro_4.wav", title: "Merc Biome Desert Intro 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_outro_1.wav", title: "Merc Biome Desert Outro 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_outro_2.wav", title: "Merc Biome Desert Outro 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_outro_3.wav", title: "Merc Biome Desert Outro 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_desert_outro_4.wav", title: "Merc Biome Desert Outro 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestaquatic_end_1.wav", title: "Merc Biome Forestaquatic End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestaquatic_start_1.wav", title: "Merc Biome Forestaquatic Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestdead_end_1.wav", title: "Merc Biome Forestdead End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestdead_start_1.wav", title: "Merc Biome Forestdead Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestgrasslands_end_1.wav", title: "Merc Biome Forestgrasslands End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestgrasslands_start_1.wav", title: "Merc Biome Forestgrasslands Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestjungle_end_1.wav", title: "Merc Biome Forestjungle End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestjungle_start_1.wav", title: "Merc Biome Forestjungle Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestkelp_end_1.wav", title: "Merc Biome Forestkelp End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestkelp_start_1.wav", title: "Merc Biome Forestkelp Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestswamp_end_1.wav", title: "Merc Biome Forestswamp End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forestswamp_start_1.wav", title: "Merc Biome Forestswamp Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_incidental_1.wav", title: "Merc Biome Forest Incidental 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_incidental_2.wav", title: "Merc Biome Forest Incidental 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_incidental_3.wav", title: "Merc Biome Forest Incidental 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_incidental_4.wav", title: "Merc Biome Forest Incidental 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_incidental_5.wav", title: "Merc Biome Forest Incidental 5" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_incidental_6.wav", title: "Merc Biome Forest Incidental 6" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_incidental_7.wav", title: "Merc Biome Forest Incidental 7" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_incidental_8.wav", title: "Merc Biome Forest Incidental 8" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_intro_1.wav", title: "Merc Biome Forest Intro 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_intro_2.wav", title: "Merc Biome Forest Intro 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_intro_3.wav", title: "Merc Biome Forest Intro 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_intro_4.wav", title: "Merc Biome Forest Intro 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_intro_5.wav", title: "Merc Biome Forest Intro 5" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_intro_6.wav", title: "Merc Biome Forest Intro 6" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_outro_1.wav", title: "Merc Biome Forest Outro 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_outro_2.wav", title: "Merc Biome Forest Outro 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_outro_3.wav", title: "Merc Biome Forest Outro 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_forest_outro_4.wav", title: "Merc Biome Forest Outro 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_icedead_end_1.wav", title: "Merc Biome Icedead End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_icedead_start_1.wav", title: "Merc Biome Icedead Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_iceforest_end_1.wav", title: "Merc Biome Iceforest End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_iceforest_start_1.wav", title: "Merc Biome Iceforest Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_ice_incidental_1.wav", title: "Merc Biome Ice Incidental 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_ice_incidental_2.wav", title: "Merc Biome Ice Incidental 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_ice_incidental_3.wav", title: "Merc Biome Ice Incidental 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_ice_incidental_4.wav", title: "Merc Biome Ice Incidental 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_ice_incidental_5.wav", title: "Merc Biome Ice Incidental 5" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_ice_incidental_6.wav", title: "Merc Biome Ice Incidental 6" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_ice_incidental_7.wav", title: "Merc Biome Ice Incidental 7" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_ice_incidental_8.wav", title: "Merc Biome Ice Incidental 8" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lavarocky_end_1.wav", title: "Merc Biome Lavarocky End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lavarocky_start_1.wav", title: "Merc Biome Lavarocky Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lavaswamp_end_1.wav", title: "Merc Biome Lavaswamp End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lavaswamp_start_1.wav", title: "Merc Biome Lavaswamp Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lava_incidental_1.wav", title: "Merc Biome Lava Incidental 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lava_incidental_2.wav", title: "Merc Biome Lava Incidental 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lava_incidental_3.wav", title: "Merc Biome Lava Incidental 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lava_incidental_4.wav", title: "Merc Biome Lava Incidental 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lava_incidental_5.wav", title: "Merc Biome Lava Incidental 5" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lava_incidental_6.wav", title: "Merc Biome Lava Incidental 6" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lava_incidental_7.wav", title: "Merc Biome Lava Incidental 7" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_biome_lava_incidental_8.wav", title: "Merc Biome Lava Incidental 8" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_death_self_1.wav", title: "Merc Death Self 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_death_self_2.wav", title: "Merc Death Self 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_death_self_3.wav", title: "Merc Death Self 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_death_teammate_1.wav", title: "Merc Death Teammate 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_death_teammate_2.wav", title: "Merc Death Teammate 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_death_teammate_3.wav", title: "Merc Death Teammate 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_high_incidental_1.wav", title: "Merc Encounter High Incidental 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_high_incidental_2.wav", title: "Merc Encounter High Incidental 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_high_incidental_3.wav", title: "Merc Encounter High Incidental 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_high_incidental_4.wav", title: "Merc Encounter High Incidental 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_high_incidental_5.wav", title: "Merc Encounter High Incidental 5" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_high_incidental_6.wav", title: "Merc Encounter High Incidental 6" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_low_incidental_1.wav", title: "Merc Encounter Low Incidental 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_low_incidental_2.wav", title: "Merc Encounter Low Incidental 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_low_incidental_3.wav", title: "Merc Encounter Low Incidental 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_low_incidental_4.wav", title: "Merc Encounter Low Incidental 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_low_incidental_5.wav", title: "Merc Encounter Low Incidental 5" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_low_incidental_6.wav", title: "Merc Encounter Low Incidental 6" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_encounter_low_incidental_7.wav", title: "Merc Encounter Low Incidental 7" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_grapple_end_1.wav", title: "Merc Grapple End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_grapple_end_2.wav", title: "Merc Grapple End 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_grapple_end_3.wav", title: "Merc Grapple End 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_grapple_start_1.wav", title: "Merc Grapple Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_grapple_start_2.wav", title: "Merc Grapple Start 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_grapple_start_3.wav", title: "Merc Grapple Start 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_hunt_objective_start_01.wav", title: "Merc Hunt Objective Start 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_hunt_objective_start_02.wav", title: "Merc Hunt Objective Start 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_hunt_objective_start_03.wav", title: "Merc Hunt Objective Start 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_hunt_objective_start_1.wav", title: "Merc Hunt Objective Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_hunt_objective_start_2.wav", title: "Merc Hunt Objective Start 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_hunt_objective_start_3.wav", title: "Merc Hunt Objective Start 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_incap_1.wav", title: "Merc Incap 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_incap_2.wav", title: "Merc Incap 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_incap_3.wav", title: "Merc Incap 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_monster_armor_low_1.wav", title: "Merc Monster Armor Low 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_monster_armor_low_2.wav", title: "Merc Monster Armor Low 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_monster_armor_low_3.wav", title: "Merc Monster Armor Low 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_monster_in_mobilearena_1.wav", title: "Merc Monster In Mobilearena 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_monster_in_mobilearena_2.wav", title: "Merc Monster In Mobilearena 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_monster_in_mobilearena_3.wav", title: "Merc Monster In Mobilearena 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_monster_not_in_mobilearena_1.wav", title: "Merc Monster Not In Mobilearena 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_revived_in_combat_1.wav", title: "Merc Revived In Combat 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_revived_in_combat_2.wav", title: "Merc Revived In Combat 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_revived_in_combat_3.wav", title: "Merc Revived In Combat 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_spot_monster_1.wav", title: "Merc Spot Monster 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_spot_monster_2.wav", title: "Merc Spot Monster 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_spot_monster_3.wav", title: "Merc Spot Monster 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_stealth_incidental_1.wav", title: "Merc Stealth Incidental 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_stealth_incidental_2.wav", title: "Merc Stealth Incidental 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_stealth_incidental_3.wav", title: "Merc Stealth Incidental 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_stealth_incidental_4.wav", title: "Merc Stealth Incidental 4" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_stealth_incidental_5.wav", title: "Merc Stealth Incidental 5" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_stealth_incidental_6.wav", title: "Merc Stealth Incidental 6" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_stealth_incidental_7.wav", title: "Merc Stealth Incidental 7" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_timer_30sec_countdown.wav", title: "Merc Timer 30Sec Countdown" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_timer_start.wav", title: "Merc Timer Start" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_wildiife_proximity_predator_1.wav", title: "Merc Wildiife Proximity Predator 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_wildiife_proximity_predator_2.wav", title: "Merc Wildiife Proximity Predator 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_merc_wildiife_proximity_predator_3.wav", title: "Merc Wildiife Proximity Predator 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minornegative_01.wav", title: "Minornegative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minornegative_02.wav", title: "Minornegative 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minornegative_03.wav", title: "Minornegative 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minornegative_04.wav", title: "Minornegative 04" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minornegative_05.wav", title: "Minornegative 05" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minornegative_06.wav", title: "Minornegative 06" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minorpositive_01.wav", title: "Minorpositive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minorpositive_02.wav", title: "Minorpositive 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minorpositive_03.wav", title: "Minorpositive 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minorpositive_04.wav", title: "Minorpositive 04" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minorpositive_05.wav", title: "Minorpositive 05" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_minorpositive_06.wav", title: "Minorpositive 06" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_objective_complete_hunter_01.wav", title: "Nest Objective Complete Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_objective_complete_hunter_02.wav", title: "Nest Objective Complete Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_objective_complete_hunter_03.wav", title: "Nest Objective Complete Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_objective_fail_hunter_01.wav", title: "Nest Objective Fail Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_objective_fail_hunter_02.wav", title: "Nest Objective Fail Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_objective_fail_hunter_03.wav", title: "Nest Objective Fail Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_objective_start_hunter_01.wav", title: "Nest Objective Start Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_objective_start_hunter_02.wav", title: "Nest Objective Start Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_objective_start_hunter_03.wav", title: "Nest Objective Start Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_round_start_hunter_01.wav", title: "Nest Round Start Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_round_start_hunter_02.wav", title: "Nest Round Start Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_nest_round_start_hunter_03.wav", title: "Nest Round Start Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_perk_end_1.wav", title: "Perk End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_perk_end_2.wav", title: "Perk End 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_perk_end_3.wav", title: "Perk End 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_perk_start_1.wav", title: "Perk Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_perk_start_2.wav", title: "Perk Start 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_perk_start_3.wav", title: "Perk Start 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_evacship_inbound_hunter_01.wav", title: "Rescue Evacship Inbound Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_objective_complete_hunter_01.wav", title: "Rescue Objective Complete Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_objective_complete_hunter_02.wav", title: "Rescue Objective Complete Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_objective_complete_hunter_03.wav", title: "Rescue Objective Complete Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_objective_fail_hunter_01.wav", title: "Rescue Objective Fail Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_objective_fail_hunter_02.wav", title: "Rescue Objective Fail Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_objective_fail_hunter_03.wav", title: "Rescue Objective Fail Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_objective_start_hunter_01.wav", title: "Rescue Objective Start Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_objective_start_hunter_02.wav", title: "Rescue Objective Start Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_objective_start_hunter_03.wav", title: "Rescue Objective Start Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_round_start_hunter_01.wav", title: "Rescue Round Start Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_round_start_hunter_02.wav", title: "Rescue Round Start Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_rescue_round_start_hunter_03.wav", title: "Rescue Round Start Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundend_default_01.wav", title: "Roundend Default 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundend_majornegative_01.wav", title: "Roundend Majornegative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundend_majorpositive_01.wav", title: "Roundend Majorpositive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundstart_default_01.wav", title: "Roundstart Default 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundstart_default_02.wav", title: "Roundstart Default 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundstart_default_03.wav", title: "Roundstart Default 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundstart_majornegative_01.wav", title: "Roundstart Majornegative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundstart_majornegative_02.wav", title: "Roundstart Majornegative 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundstart_majornegative_03.wav", title: "Roundstart Majornegative 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundstart_majorpositive_01.wav", title: "Roundstart Majorpositive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundstart_majorpositive_02.wav", title: "Roundstart Majorpositive 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_roundstart_majorpositive_03.wav", title: "Roundstart Majorpositive 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_startled_birds_1.wav", title: "Startled Birds 1" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_startled_birds_2.wav", title: "Startled Birds 2" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_startled_birds_3.wav", title: "Startled Birds 3" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_stealth_intro_hunter_01.wav", title: "Stealth Intro Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_stealth_intro_hunter_02.wav", title: "Stealth Intro Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_stealth_intro_hunter_03.wav", title: "Stealth Intro Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_stealth_outro_hunter_01.wav", title: "Stealth Outro Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_stealth_outro_hunter_02.wav", title: "Stealth Outro Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_stealth_outro_hunter_03.wav", title: "Stealth Outro Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_incidental_hunter_01.wav", title: "Tracking Incidental Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_incidental_hunter_02.wav", title: "Tracking Incidental Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_incidental_hunter_03.wav", title: "Tracking Incidental Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_incidental_hunter_04.wav", title: "Tracking Incidental Hunter 04" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_incidental_hunter_05.wav", title: "Tracking Incidental Hunter 05" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_incidental_hunter_06.wav", title: "Tracking Incidental Hunter 06" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_intro_hunter_01.wav", title: "Tracking Intro Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_intro_hunter_02.wav", title: "Tracking Intro Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_intro_hunter_03.wav", title: "Tracking Intro Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_outro_hunter_01.wav", title: "Tracking Outro Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_outro_hunter_02.wav", title: "Tracking Outro Hunter 02" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tracking_outro_hunter_03.wav", title: "Tracking Outro Hunter 03" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tutorial_ending_hunter_01.wav", title: "Tutorial Ending Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tutorial_evac_called_hunter_01.wav", title: "Tutorial Evac Called Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/merc/s_tutorial_objectivecomplete_hunter_01.wav", title: "Tutorial Objectivecomplete Hunter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_encounter_01.wav", title: "Encounter 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_encounter_high_01.wav", title: "Encounter High 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_encounter_low_01.wav", title: "Encounter Low 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_encounter_medium_01.wav", title: "Encounter Medium 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_evolve_01.wav", title: "Evolve 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_hunt_01.wav", title: "Hunt 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_hunt_02.wav", title: "Hunt 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_hunt_03.wav", title: "Hunt 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_stealth_high_01.wav", title: "Stealth High 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_stealth_low_01.wav", title: "Stealth Low 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_stealth_medium_01.wav", title: "Stealth Medium 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_tracked_01.wav", title: "Tracked 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_tutorial_act1_monster_02.wav", title: "Tutorial Act1 Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_tutorial_act1_monster_03.wav", title: "Tutorial Act1 Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_tutorial_act2_monster_01.wav", title: "Tutorial Act2 Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_tutorial_act2_monster_02.wav", title: "Tutorial Act2 Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_tutorial_act2_monster_03.wav", title: "Tutorial Act2 Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/m_tutorial_act2_monster_04.wav", title: "Tutorial Act2 Monster 04" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_circling_birds_1.wav", title: "Circling Birds 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_circling_birds_2.wav", title: "Circling Birds 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_circling_birds_3.wav", title: "Circling Birds 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_defend_hunterreinforcements_monster_01.wav", title: "Defend Hunterreinforcements Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_defend_minionwave_start_monster_01.wav", title: "Defend Minionwave Start Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_defend_minionwave_start_monster_02.wav", title: "Defend Minionwave Start Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_defend_minionwave_start_monster_03.wav", title: "Defend Minionwave Start Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_defend_objective01_complete_monster_01.wav", title: "Defend Objective01 Complete Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_defend_objective02_complete_monster_01.wav", title: "Defend Objective02 Complete Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_defend_round_start_monster_01.wav", title: "Defend Round Start Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_defend_round_start_monster_02.wav", title: "Defend Round Start Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_high_incidental_monster_1.wav", title: "Encounter High Incidental Monster 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_high_incidental_monster_2.wav", title: "Encounter High Incidental Monster 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_high_incidental_monster_3.wav", title: "Encounter High Incidental Monster 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_high_incidental_monster_4.wav", title: "Encounter High Incidental Monster 4" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_high_incidental_monster_5.wav", title: "Encounter High Incidental Monster 5" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_high_incidental_monster_6.wav", title: "Encounter High Incidental Monster 6" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_intro_monster_01.wav", title: "Encounter Intro Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_intro_monster_02.wav", title: "Encounter Intro Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_intro_monster_03.wav", title: "Encounter Intro Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_low_incidental_monster_1.wav", title: "Encounter Low Incidental Monster 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_low_incidental_monster_2.wav", title: "Encounter Low Incidental Monster 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_low_incidental_monster_3.wav", title: "Encounter Low Incidental Monster 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_low_incidental_monster_4.wav", title: "Encounter Low Incidental Monster 4" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_low_incidental_monster_5.wav", title: "Encounter Low Incidental Monster 5" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_low_incidental_monster_6.wav", title: "Encounter Low Incidental Monster 6" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_med_incidental_monster_1.wav", title: "Encounter Med Incidental Monster 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_med_incidental_monster_2.wav", title: "Encounter Med Incidental Monster 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_med_incidental_monster_3.wav", title: "Encounter Med Incidental Monster 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_med_incidental_monster_4.wav", title: "Encounter Med Incidental Monster 4" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_med_incidental_monster_5.wav", title: "Encounter Med Incidental Monster 5" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_med_incidental_monster_6.wav", title: "Encounter Med Incidental Monster 6" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_outro_monster_01.wav", title: "Encounter Outro Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_outro_monster_02.wav", title: "Encounter Outro Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_encounter_outro_monster_03.wav", title: "Encounter Outro Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_evolve_01.wav", title: "Evolve 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_evolve_begin_01.wav", title: "Evolve Begin 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_evolve_begin_02.wav", title: "Evolve Begin 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_evolve_intro_01.wav", title: "Evolve Intro 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_evolve_outro_01.wav", title: "Evolve Outro 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majornegative_01.wav", title: "Majornegative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majornegative_02.wav", title: "Majornegative 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majornegative_03.wav", title: "Majornegative 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majornegative_04.wav", title: "Majornegative 04" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majornegative_05.wav", title: "Majornegative 05" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majornegative_06.wav", title: "Majornegative 06" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majorpositive_01.wav", title: "Majorpositive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majorpositive_02.wav", title: "Majorpositive 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majorpositive_03.wav", title: "Majorpositive 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majorpositive_04.wav", title: "Majorpositive 04" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majorpositive_05.wav", title: "Majorpositive 05" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_majorpositive_06.wav", title: "Majorpositive 06" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minornegative_01.wav", title: "Minornegative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minornegative_02.wav", title: "Minornegative 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minornegative_03.wav", title: "Minornegative 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minornegative_04.wav", title: "Minornegative 04" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minornegative_05.wav", title: "Minornegative 05" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minornegative_06.wav", title: "Minornegative 06" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minorpositive_01.wav", title: "Minorpositive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minorpositive_02.wav", title: "Minorpositive 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minorpositive_03.wav", title: "Minorpositive 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minorpositive_04.wav", title: "Minorpositive 04" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minorpositive_05.wav", title: "Minorpositive 05" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_minorpositive_06.wav", title: "Minorpositive 06" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_armor_gone_1.wav", title: "Monster Armor Gone 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_armor_gone_2.wav", title: "Monster Armor Gone 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_armor_gone_3.wav", title: "Monster Armor Gone 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_armor_low_1.wav", title: "Monster Armor Low 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_armor_low_2.wav", title: "Monster Armor Low 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_armor_low_3.wav", title: "Monster Armor Low 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunter_death_1.wav", title: "Monster Hunter Death 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunter_death_2.wav", title: "Monster Hunter Death 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunter_death_3.wav", title: "Monster Hunter Death 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunter_incapped_1.wav", title: "Monster Hunter Incapped 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunter_incapped_2.wav", title: "Monster Hunter Incapped 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunter_incapped_3.wav", title: "Monster Hunter Incapped 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunter_revived_in_combat_1.wav", title: "Monster Hunter Revived In Combat 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunter_revived_in_combat_2.wav", title: "Monster Hunter Revived In Combat 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunter_revived_in_combat_3.wav", title: "Monster Hunter Revived In Combat 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunt_objective_start_1.wav", title: "Monster Hunt Objective Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunt_objective_start_2.wav", title: "Monster Hunt Objective Start 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_hunt_objective_start_3.wav", title: "Monster Hunt Objective Start 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_in_mobilearena_1.wav", title: "Monster In Mobilearena 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_in_mobilearena_2.wav", title: "Monster In Mobilearena 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_in_mobilearena_3.wav", title: "Monster In Mobilearena 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_not_in_mobilearena_1.wav", title: "Monster Not In Mobilearena 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_spotted_1.wav", title: "Monster Spotted 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_spotted_2.wav", title: "Monster Spotted 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_spotted_3.wav", title: "Monster Spotted 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_timer_30sec_countdown.wav", title: "Monster Timer 30Sec Countdown" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_timer_start.wav", title: "Monster Timer Start" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_wildiife_proximity_predator_1.wav", title: "Monster Wildiife Proximity Predator 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_wildiife_proximity_predator_2.wav", title: "Monster Wildiife Proximity Predator 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_wildiife_proximity_predator_3.wav", title: "Monster Wildiife Proximity Predator 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_wildiife_proximity_prey_1.wav", title: "Monster Wildiife Proximity Prey 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_wildiife_proximity_prey_2.wav", title: "Monster Wildiife Proximity Prey 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_monster_wildiife_proximity_prey_3.wav", title: "Monster Wildiife Proximity Prey 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_objective_complete_monster_01.wav", title: "Nest Objective Complete Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_objective_complete_monster_02.wav", title: "Nest Objective Complete Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_objective_complete_monster_03.wav", title: "Nest Objective Complete Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_objective_fail_monster_01.wav", title: "Nest Objective Fail Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_objective_fail_monster_02.wav", title: "Nest Objective Fail Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_objective_fail_monster_03.wav", title: "Nest Objective Fail Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_objective_start_monster_01.wav", title: "Nest Objective Start Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_objective_start_monster_02.wav", title: "Nest Objective Start Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_objective_start_monster_03.wav", title: "Nest Objective Start Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_round_start_monster_01.wav", title: "Nest Round Start Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_round_start_monster_02.wav", title: "Nest Round Start Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_nest_round_start_monster_03.wav", title: "Nest Round Start Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_perk_end_1.wav", title: "Perk End 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_perk_end_2.wav", title: "Perk End 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_perk_end_3.wav", title: "Perk End 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_perk_start_1.wav", title: "Perk Start 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_perk_start_2.wav", title: "Perk Start 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_perk_start_3.wav", title: "Perk Start 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_evacship_inbound_monster_01.wav", title: "Rescue Evacship Inbound Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_objective_complete_monster_01.wav", title: "Rescue Objective Complete Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_objective_complete_monster_02.wav", title: "Rescue Objective Complete Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_objective_complete_monster_03.wav", title: "Rescue Objective Complete Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_objective_fail_monster_01.wav", title: "Rescue Objective Fail Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_objective_fail_monster_02.wav", title: "Rescue Objective Fail Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_objective_fail_monster_03.wav", title: "Rescue Objective Fail Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_objective_start_monster_01.wav", title: "Rescue Objective Start Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_objective_start_monster_02.wav", title: "Rescue Objective Start Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_objective_start_monster_03.wav", title: "Rescue Objective Start Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_round_start_monster_01.wav", title: "Rescue Round Start Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_round_start_monster_02.wav", title: "Rescue Round Start Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_rescue_round_start_monster_03.wav", title: "Rescue Round Start Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_roundstart_default_01.wav", title: "Roundstart Default 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_roundstart_default_02.wav", title: "Roundstart Default 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_roundstart_default_03.wav", title: "Roundstart Default 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_roundstart_majornegative_01.wav", title: "Roundstart Majornegative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_roundstart_majornegative_02.wav", title: "Roundstart Majornegative 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_roundstart_majornegative_03.wav", title: "Roundstart Majornegative 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_roundstart_majorpositive_01.wav", title: "Roundstart Majorpositive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_roundstart_majorpositive_02.wav", title: "Roundstart Majorpositive 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_roundstart_majorpositive_03.wav", title: "Roundstart Majorpositive 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stageup_alert_01.wav", title: "Stageup Alert 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stageup_alert_02.wav", title: "Stageup Alert 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_startled_birds_1.wav", title: "Startled Birds 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_startled_birds_2.wav", title: "Startled Birds 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_startled_birds_3.wav", title: "Startled Birds 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_high_incidental_monster_1.wav", title: "Stealth High Incidental Monster 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_high_incidental_monster_2.wav", title: "Stealth High Incidental Monster 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_high_incidental_monster_3.wav", title: "Stealth High Incidental Monster 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_high_incidental_monster_4.wav", title: "Stealth High Incidental Monster 4" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_high_incidental_monster_5.wav", title: "Stealth High Incidental Monster 5" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_high_incidental_monster_6.wav", title: "Stealth High Incidental Monster 6" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_intro_monster_01.wav", title: "Stealth Intro Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_intro_monster_02.wav", title: "Stealth Intro Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_intro_monster_03.wav", title: "Stealth Intro Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_low_incidental_monster_1.wav", title: "Stealth Low Incidental Monster 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_low_incidental_monster_2.wav", title: "Stealth Low Incidental Monster 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_low_incidental_monster_3.wav", title: "Stealth Low Incidental Monster 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_low_incidental_monster_4.wav", title: "Stealth Low Incidental Monster 4" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_low_incidental_monster_5.wav", title: "Stealth Low Incidental Monster 5" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_low_incidental_monster_6.wav", title: "Stealth Low Incidental Monster 6" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_med_incidental_monster_1.wav", title: "Stealth Med Incidental Monster 1" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_med_incidental_monster_2.wav", title: "Stealth Med Incidental Monster 2" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_med_incidental_monster_3.wav", title: "Stealth Med Incidental Monster 3" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_med_incidental_monster_4.wav", title: "Stealth Med Incidental Monster 4" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_med_incidental_monster_5.wav", title: "Stealth Med Incidental Monster 5" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_med_incidental_monster_6.wav", title: "Stealth Med Incidental Monster 6" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_outro_monster_01.wav", title: "Stealth Outro Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_outro_monster_02.wav", title: "Stealth Outro Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_stealth_outro_monster_03.wav", title: "Stealth Outro Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_su_stage2_01.wav", title: "Su Stage2 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_su_stage3_01.wav", title: "Su Stage3 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_incidental_monster_01.wav", title: "Tracking Incidental Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_incidental_monster_02.wav", title: "Tracking Incidental Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_incidental_monster_03.wav", title: "Tracking Incidental Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_incidental_monster_04.wav", title: "Tracking Incidental Monster 04" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_incidental_monster_05.wav", title: "Tracking Incidental Monster 05" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_incidental_monster_06.wav", title: "Tracking Incidental Monster 06" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_intro_monster_01.wav", title: "Tracking Intro Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_intro_monster_02.wav", title: "Tracking Intro Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_intro_monster_03.wav", title: "Tracking Intro Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_outro_monster_01.wav", title: "Tracking Outro Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_outro_monster_02.wav", title: "Tracking Outro Monster 02" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tracking_outro_monster_03.wav", title: "Tracking Outro Monster 03" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tutorial_objectivecomplete1_monster_01.wav", title: "Tutorial Objectivecomplete1 Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tutorial_objectivecomplete2_monster_01.wav", title: "Tutorial Objectivecomplete2 Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tutorial_objectivecomplete3_monster_01.wav", title: "Tutorial Objectivecomplete3 Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tutorial_objectivecomplete4_monster_01.wav", title: "Tutorial Objectivecomplete4 Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tutorial_round_start_monster_01.wav", title: "Tutorial Round Start Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/monster/s_tutorial_transition_monster_01.wav", title: "Tutorial Transition Monster 01" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/merc_major_negative_01_v01.wav", title: "Merc Major Negative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Major_Negative_02_V01.wav", title: "Merc Major Negative 02" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Major_Negative_03_V01.wav", title: "Merc Major Negative 03" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Major_Negative_04_V01.wav", title: "Merc Major Negative 04" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Major_Negative_05_V01.wav", title: "Merc Major Negative 05" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Major_Negative_06_V01.wav", title: "Merc Major Negative 06" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/merc_major_positive_01_v01.wav", title: "Merc Major Positive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Major_Positive_02_V01.wav", title: "Merc Major Positive 02" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Major_Positive_03_V01.wav", title: "Merc Major Positive 03" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Major_Positive_04_V01.wav", title: "Merc Major Positive 04" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Major_Positive_05_V01.wav", title: "Merc Major Positive 05" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Major_Positive_06_V01.wav", title: "Merc Major Positive 06" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/merc_minor_negative_01_v01.wav", title: "Merc Minor Negative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Minor_Negative_02_V01.wav", title: "Merc Minor Negative 02" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Minor_Negative_03_V01.wav", title: "Merc Minor Negative 03" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Minor_Negative_04_V01.wav", title: "Merc Minor Negative 04" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Minor_Negative_05_V01.wav", title: "Merc Minor Negative 05" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Minor_Negative_06_V01.wav", title: "Merc Minor Negative 06" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/merc_minor_positive_01_v01.wav", title: "Merc Minor Positive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Minor_Positive_02_V01.wav", title: "Merc Minor Positive 02" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Minor_Positive_03_V01.wav", title: "Merc Minor Positive 03" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Minor_Positive_04_V01.wav", title: "Merc Minor Positive 04" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Minor_Positive_05_V01.wav", title: "Merc Minor Positive 05" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Merc_Minor_Positive_06_V01.wav", title: "Merc Minor Positive 06" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/monster_major_negative_01_v01.wav", title: "Monster Major Negative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Major_Negative_02_V01.wav", title: "Monster Major Negative 02" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Major_Negative_03_V01.wav", title: "Monster Major Negative 03" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Major_Negative_04_V01.wav", title: "Monster Major Negative 04" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Major_Negative_05_V01.wav", title: "Monster Major Negative 05" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Major_Negative_06_V01.wav", title: "Monster Major Negative 06" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/monster_major_positive_01_v01.wav", title: "Monster Major Positive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Major_Positive_02_V01.wav", title: "Monster Major Positive 02" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Major_Positive_03_V01.wav", title: "Monster Major Positive 03" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Major_Positive_04_V01.wav", title: "Monster Major Positive 04" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Major_Positive_05_V01.wav", title: "Monster Major Positive 05" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Major_Positive_06_V01.wav", title: "Monster Major Positive 06" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/monster_minor_negative_01_v01.wav", title: "Monster Minor Negative 01" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Minor_Negative_02_V01.wav", title: "Monster Minor Negative 02" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Minor_Negative_03_V01.wav", title: "Monster Minor Negative 03" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Minor_Negative_04_V01.wav", title: "Monster Minor Negative 04" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Minor_Negative_05_V01.wav", title: "Monster Minor Negative 05" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Minor_Negative_06_V01.wav", title: "Monster Minor Negative 06" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/monster_minor_positive_01_v01.wav", title: "Monster Minor Positive 01" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Minor_Positive_02_V01.wav", title: "Monster Minor Positive 02" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Minor_Positive_03_V01.wav", title: "Monster Minor Positive 03" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Minor_Positive_04_V01.wav", title: "Monster Minor Positive 04" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Minor_Positive_05_V01.wav", title: "Monster Minor Positive 05" },
  { src: "https://assets.modded-evolve.com/audio/music/round_end/Monster_Minor_Positive_06_V01.wav", title: "Monster Minor Positive 06" },
  { src: "https://assets.modded-evolve.com/audio/music/silence/silence.wav", title: "Silence" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/Tension_Hunter_End_01.wav", title: "Tension Hunter End 01" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/Tension_Hunter_End_02.wav", title: "Tension Hunter End 02" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/tension_hunter_end_03.wav", title: "Tension Hunter End 03" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/tension_hunter_loop.wav", title: "Tension Hunter Loop" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/Tension_Hunter_Start_01.wav", title: "Tension Hunter Start 01" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/Tension_Hunter_Start_02.wav", title: "Tension Hunter Start 02" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/tension_hunter_start_03.wav", title: "Tension Hunter Start 03" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/Tension_Monster_End_01.wav", title: "Tension Monster End 01" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/tension_monster_end_02.wav", title: "Tension Monster End 02" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/Tension_Monster_End_03.wav", title: "Tension Monster End 03" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/tension_monster_loop.wav", title: "Tension Monster Loop" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/Tension_Monster_Start_01.wav", title: "Tension Monster Start 01" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/tension_monster_start_02.wav", title: "Tension Monster Start 02" },
  { src: "https://assets.modded-evolve.com/audio/music/tension/tension_monster_start_03.wav", title: "Tension Monster Start 03" },
];

let musicAudio = new Audio();
musicAudio.volume = 0.2;
let musicCurrentIdx = -1;
let musicLoop = false;
let musicShuffle = false;
let musicShuffleOrder = [];
let musicFilteredTracks = [...Array(MUSIC_TRACKS.length).keys()];

function musicFmt(s) {
  if (!s || isNaN(s)) return '0:00';
  return Math.floor(s/60) + ':' + String(Math.floor(s%60)).padStart(2,'0');
}

function musicToggleTracklist() {
  const overlay = document.getElementById('music-tracklist-overlay');
  const tab = document.getElementById('music-tab-btn');
  const backBtn = document.getElementById('music-back-btn');
  if (!overlay) return;
  const isOpening = !overlay.classList.contains('open');
  overlay.classList.toggle('open');
  tab.classList.toggle('open');
  if (backBtn) backBtn.style.display = isOpening ? 'none' : '';
}

function musicBuildList() {
  const list = document.getElementById('music-list');
  if (!list) return;
  list.innerHTML = '';
  musicFilteredTracks.forEach((trackIdx, i) => {
    const t = MUSIC_TRACKS[trackIdx];
    const row = document.createElement('div');
    row.className = 'music-track' + (trackIdx === musicCurrentIdx ? ' active' : '');
    row.dataset.idx = trackIdx;
    const titleText = t.title;
    const isLong = titleText.length > 30;
    row.innerHTML = `
      <div class="music-track-num">${i+1}</div>
      <div class="music-track-play-icon">▶</div>
      <div class="music-track-title${isLong ? ' scrolling' : ''}">
        ${isLong ? `<span>${titleText}&nbsp;&nbsp;&nbsp;${titleText}</span>` : titleText}
      </div>
    `;
    row.addEventListener('click', () => musicPlay(trackIdx));
    list.appendChild(row);
  });
  document.getElementById('music-track-count').textContent = musicFilteredTracks.length + ' tracks';
}

function musicPlay(idx) {
  musicCurrentIdx = idx;
  const t = MUSIC_TRACKS[idx];
  musicAudio.src = t.src;
  musicAudio.play().catch(()=>{});
  document.getElementById('music-now-playing').textContent = t.title;
  document.getElementById('music-btn-play').textContent = '▐▐';
  document.querySelectorAll('.music-track').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.idx) === idx);
  });
  // scroll active track into view
  const activeEl = document.querySelector('.music-track.active');
  if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
}

function musicStop() {
  musicAudio.pause();
  musicAudio.currentTime = 0;
  document.getElementById('music-btn-play').textContent = '▶';
  const fill = document.getElementById('music-progress-fill');
  const time = document.getElementById('music-time');
  if (fill) fill.style.width = '0%';
  if (time) time.textContent = '0:00 / 0:00';
}

function musicTogglePlay() {
  const btn = document.getElementById('music-btn-play');
  if (musicAudio.paused) {
    if (!musicAudio.src && musicFilteredTracks.length) {
      musicPlay(musicFilteredTracks[0]);
    } else {
      musicAudio.play().catch(()=>{});
      btn.textContent = '▐▐';
    }
  } else {
    musicAudio.pause();
    btn.textContent = '▶';
  }
}

function musicNext() {
  if (musicFilteredTracks.length === 0) return;
  if (musicShuffle) {
    const idx = Math.floor(Math.random() * musicFilteredTracks.length);
    musicPlay(musicFilteredTracks[idx]);
  } else {
    const pos = musicFilteredTracks.indexOf(musicCurrentIdx);
    const next = musicFilteredTracks[(pos + 1) % musicFilteredTracks.length];
    musicPlay(next);
  }
}

function musicPrev() {
  if (musicFilteredTracks.length === 0) return;
  const pos = musicFilteredTracks.indexOf(musicCurrentIdx);
  const prev = musicFilteredTracks[(pos - 1 + musicFilteredTracks.length) % musicFilteredTracks.length];
  musicPlay(prev);
}

function musicToggleLoop() {
  musicLoop = !musicLoop;
  document.getElementById('music-btn-loop').classList.toggle('active', musicLoop);
}

function musicToggleShuffle() {
  musicShuffle = !musicShuffle;
  document.getElementById('music-btn-shuffle').classList.toggle('active', musicShuffle);
}

function musicSetVolume(val) {
  musicAudio.volume = parseFloat(val);
  const icon = document.querySelector('.music-vol-icon');
  if (icon) icon.textContent = parseFloat(val) === 0 ? '🔇' : parseFloat(val) < 0.5 ? '🔉' : '🔊';
  const slider = document.getElementById('music-volume');
  if (slider) slider.style.setProperty('--vol-pct', Math.round(parseFloat(val)*100)+'%');
}

function musicToggleMute() {
  const slider = document.getElementById('music-volume');
  if (musicAudio.volume > 0) {
    musicAudio._prevVol = musicAudio.volume;
    musicAudio.volume = 0;
    if (slider) slider.value = 0;
  } else {
    musicAudio.volume = musicAudio._prevVol || 1;
    if (slider) slider.value = musicAudio.volume;
  }
  musicSetVolume(musicAudio.volume);
}

function musicSeek(e) {
  const bar = document.getElementById('music-progress-bar');
  if (!bar || !musicAudio.duration) return;
  const rect = bar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  musicAudio.currentTime = pct * musicAudio.duration;
}

function musicSearch(val) {
  const q = val.toLowerCase().trim();
  musicFilteredTracks = MUSIC_TRACKS.map((t,i) => i).filter(i => !q || MUSIC_TRACKS[i].title.toLowerCase().includes(q));
  musicBuildList();
}

musicAudio.addEventListener('timeupdate', () => {
  if (!musicAudio.duration) return;
  const pct = musicAudio.currentTime / musicAudio.duration * 100;
  const fill = document.getElementById('music-progress-fill');
  const time = document.getElementById('music-time');
  if (fill) fill.style.width = pct + '%';
  if (time) time.textContent = musicFmt(musicAudio.currentTime) + ' / ' + musicFmt(musicAudio.duration);
});

musicAudio.addEventListener('ended', () => {
  if (musicLoop) { musicAudio.play(); return; }
  musicNext();
});

musicAudio.addEventListener('play', () => {
  const btn = document.getElementById('music-btn-play');
  if (btn) btn.textContent = '▐▐';
});
musicAudio.addEventListener('pause', () => {
  const btn = document.getElementById('music-btn-play');
  if (btn) btn.textContent = '▶';
});

// Music background — cycles through videos and images
const MUSIC_BG_ITEMS = [
  // Videos
  { type: 'video', src: 'https://assets.modded-evolve.com/videos/legacyevolve/fullscreen_bg_loop1_40534656.mp4' },
  { type: 'video', src: 'https://assets.modded-evolve.com/videos/legacyevolve/fullscreen_bg_loop2_40534656.mp4' },
  { type: 'video', src: 'https://assets.modded-evolve.com/videos/legacyevolve/fullscreen_bg_loop3_40534656.mp4' },
  { type: 'video', src: 'https://assets.modded-evolve.com/videos/legacyevolve/fullscreen_bg_loop4_40534656.mp4' },
  // Hunter backgrounds
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/hunters_bg1.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/hunters_bg2.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/hunters_bg3.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/hunters_bg4.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/hunters_bg5.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/hunters_bg6.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/hunters_bg7.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/hunters_bg8.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/hunters_bg9.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/hunters_bg10.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_hunters1.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_hunters2.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_hunters3.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_hunters4.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_hunters5.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_hunters6.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_hunters7.png' },
  // Monster backgrounds
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_monster_bg1.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_monster_bg2.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_monster_bg3.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_monster_bg4.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_monster_bg5.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_monster_bg6.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/fullscreen_monster_bg7.png' },
  // Goliath
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/goliath_bg1.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/goliath_bg2.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/goliath_bg3.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/goliath_bg4.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/goliath_bg5.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/goliath_bg6.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/goliath_bg7.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/goliath_bg8.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/goliath_bg9.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/goliath_bg10.png' },
  // Kraken
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/kraken_bg1.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/kraken_bg2.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/kraken_bg3.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/kraken_bg4.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/kraken_bg5.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/kraken_bg6.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/kraken_bg7.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/kraken_bg8.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/kraken_bg9.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/kraken_bg10.png' },
  // Wraith
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg1.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg2.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg3.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg4.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg5.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg6.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg7.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg8.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg9.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg10.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/wraith_bg11.png' },
  // Rocky (Behemoth)
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/rocky_bg1.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/rocky_bg2.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/rocky_bg3.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/rocky_bg4.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/rocky_bg5.png' },
  // Loading screens
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_desert_canyon.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_desert_defend.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_desert_harsh.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_desert_mine.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_desert_mountains.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_forest_cliffs.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_forest_gulch.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_forest_rapids.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_forest_ruins.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_forest_slagtown.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_ice_alpine.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_ice_crashsite.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_ice_lake.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_ice_peak.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_lava_depths.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_lava_paths.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_lava_rivers.png' },
  { type: 'image', src: 'https://assets.modded-evolve.com/images/gallery/maps/load_lava_valley.png' },
];

let musicBgIdx = Math.floor(Math.random() * MUSIC_BG_ITEMS.length);
let musicBgTimer = null;

function musicInitBg() {
  musicShowBgItem(musicBgIdx);
}

function musicShowBgItem(idx) {
  const item = MUSIC_BG_ITEMS[idx];
  const vid = document.getElementById('music-bg-video');
  const img = document.getElementById('music-bg-image');
  if (!vid || !img) return;

  clearTimeout(musicBgTimer);

  if (item.type === 'video') {
    img.style.opacity = '0';
    vid.style.opacity = '1';
    vid.src = item.src;
    vid.play().catch(() => {});
    // When video ends, move to next
    vid.onended = () => musicNextBg();
  } else {
    vid.style.opacity = '0';
    vid.pause();
    vid.src = '';
    img.src = item.src;
    img.style.opacity = '1';
    // Hold image for 20 seconds then move on
    musicBgTimer = setTimeout(() => musicNextBg(), 20000);
  }
}

function musicNextBg() {
  musicBgIdx = (musicBgIdx + 1) % MUSIC_BG_ITEMS.length;
  musicShowBgItem(musicBgIdx);
}

let musicPageInitialized = false;
function musicActivatePage() {
  if (!musicPageInitialized) {
    musicPageInitialized = true;
    musicBuildList();
  }
  musicInitBg();
}
function musicDeactivatePage() {
  clearTimeout(musicBgTimer);
  musicBgTimer = null;
  const vid = document.getElementById('music-bg-video');
  const img = document.getElementById('music-bg-image');
  if (vid) {
    vid.pause();
    vid.removeAttribute('src');
    vid.load(); // Cancel any outstanding video download.
  }
  if (img) img.removeAttribute('src');
}
