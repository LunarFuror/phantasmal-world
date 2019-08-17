export enum ObjectType {
    // Make sure ObjectType does not overlap NpcType.
    Unknown = 1000,
    PlayerSet,
    Particle,
    Teleporter,
    Warp,
    LightCollision,
    Item,
    EnvSound,
    FogCollision,
    EventCollision,
    CharaCollision,
    ElementalTrap,
    StatusTrap,
    HealTrap,
    LargeElementalTrap,
    ObjRoomID,
    Sensor,
    UnknownItem16,
    Lensflare,
    ScriptCollision,
    HealRing,
    MapCollision,
    ScriptCollisionA,
    ItemLight,
    RadarCollision,
    FogCollisionSW,
    BossTeleporter,
    ImageBoard,
    QuestWarp,
    Epilogue,
    UnknownItem29,
    UnknownItem30,
    UnknownItem31,
    BoxDetectObject,
    SymbolChatObject,
    TouchPlateObject,
    TargetableObject,
    EffectObject,
    CountDownObject,
    UnknownItem38,
    UnknownItem39,
    UnknownItem40,
    UnknownItem41,
    MenuActivation,
    TelepipeLocation,
    BGMCollision,
    MainRagolTeleporter,
    LobbyTeleporter,
    PrincipalWarp,
    ShopDoor,
    HuntersGuildDoor,
    TeleporterDoor,
    MedicalCenterDoor,
    Elevator,
    EasterEgg,
    ValentinesHeart,
    ChristmasTree,
    ChristmasWreath,
    HalloweenPumpkin,
    TwentyFirstCentury,
    Sonic,
    WelcomeBoard,
    Firework,
    LobbyScreenDoor,
    MainRagolTeleporterBattleInNextArea,
    LabTeleporterDoor,
    Pioneer2InvisibleTouchplate,
    ForestDoor,
    ForestSwitch,
    LaserFence,
    LaserSquareFence,
    ForestLaserFenceSwitch,
    LightRays,
    BlueButterfly,
    Probe,
    RandomTypeBox1,
    ForestWeatherStation,
    Battery,
    ForestConsole,
    BlackSlidingDoor,
    RicoMessagePod,
    EnergyBarrier,
    ForestRisingBridge,
    SwitchNoneDoor,
    EnemyBoxGrey,
    FixedTypeBox,
    EnemyBoxBrown,
    EmptyTypeBox,
    LaserFenseEx,
    LaserSquareFenceEx,
    FloorPanel1,
    Caves4ButtonDoor,
    CavesNormalDoor,
    CavesSmashingPillar,
    CavesSign1,
    CavesSign2,
    CavesSign3,
    HexagalTank,
    BrownPlatform,
    WarningLightObject,
    Rainbow,
    FloatingJelifish,
    FloatingDragonfly,
    CavesSwitchDoor,
    RobotRechargeStation,
    CavesCakeShop,
    Caves1SmallRedRock,
    Caves1MediumRedRock,
    Caves1LargeRedRock,
    Caves2SmallRock1,
    Caves2MediumRock1,
    Caves2LargeRock1,
    Caves2SmallRock2,
    Caves2MediumRock2,
    Caves2LargeRock2,
    Caves3SmallRock,
    Caves3MediumRock,
    Caves3LargeRock,
    FloorPanel2,
    DestructableRockCaves1,
    DestructableRockCaves2,
    DestructableRockCaves3,
    MinesDoor,
    FloorPanel3,
    MinesSwitchDoor,
    LargeCryoTube,
    ComputerLikeCalus,
    GreenScreenOpeningAndClosing,
    FloatingRobot,
    FloatingBlueLight,
    SelfDestructingObject1,
    SelfDestructingObject2,
    SelfDestructingObject3,
    SparkMachine,
    MinesLargeFlashingCrate,
    RuinsSeal,
    RuinsTeleporter,
    RuinsWarpSiteToSite,
    RuinsSwitch,
    FloorPanel4,
    Ruins1Door,
    Ruins3Door,
    Ruins2Door,
    Ruins11ButtonDoor,
    Ruins21ButtonDoor,
    Ruins31ButtonDoor,
    Ruins4ButtonDoor,
    Ruins2ButtonDoor,
    RuinsSensor,
    RuinsFenceSwitch,
    RuinsLaserFence4x2,
    RuinsLaserFence6x2,
    RuinsLaserFence4x4,
    RuinsLaserFence6x4,
    RuinsPoisonBlob,
    RuinsPilarTrap,
    PopupTrapNoTech,
    RuinsCrystal,
    Monument,
    RuinsRock1,
    RuinsRock2,
    RuinsRock3,
    RuinsRock4,
    RuinsRock5,
    RuinsRock6,
    RuinsRock7,
    Poison,
    FixedBoxTypeRuins,
    RandomBoxTypeRuins,
    EnemyTypeBoxYellow,
    EnemyTypeBoxBlue,
    EmptyTypeBoxBlue,
    DestructableRock,
    PopupTrapsTechs,
    FlyingWhiteBird,
    Tower,
    FloatingRocks,
    FloatingSoul,
    Butterfly,
    LobbyGameMenu,
    LobbyWarpObject,
    Lobby1EventObjectDefaultTree,
    UnknownItem387,
    UnknownItem388,
    UnknownItem389,
    LobbyEventObjectStaticPumpkin,
    LobbyEventObject3ChristmasWindows,
    LobbyEventObjectRedAndWhiteCurtain,
    UnknownItem393,
    UnknownItem394,
    LobbyFishTank,
    LobbyEventObjectButterflies,
    UnknownItem400,
    GreyWallLow,
    SpaceshipDoor,
    GreyWallHigh,
    TempleNormalDoor,
    BreakableWallWallButUnbreakable,
    BrokenCilinderAndRubble,
    ThreeBrokenWallPiecesOnFloor,
    HighBrickCilinder,
    LyingCilinder,
    BrickConeWithFlatTop,
    BreakableTempleWall,
    TempleMapDetect,
    SmallBrownBrickRisingBridge,
    LongRisingBridgeWithPinkHighEdges,
    FourSwitchTempleDoor,
    FourButtonSpaceshipDoor,
    ItemBoxCca,
    TeleporterEp2,
    CCADoor,
    SpecialBoxCCA,
    BigCCADoor,
    BigCCADoorSwitch,
    LittleRock,
    Little3StoneWall,
    Medium3StoneWall,
    SpiderPlant,
    CCAAreaTeleporter,
    UnknownItem523,
    WhiteBird,
    OrangeBird,
    Saw,
    LaserDetect,
    UnknownItem529,
    UnknownItem530,
    Seagull,
    Fish,
    SeabedDoorWithBlueEdges,
    SeabedDoorAlwaysOpenNonTriggerable,
    LittleCryotube,
    WideGlassWallBreakable,
    BlueFloatingRobot,
    RedFloatingRobot,
    Dolphin,
    CaptureTrap,
    VRLink,
    UnknownItem576,
    WarpInBarbaRayRoom,
    UnknownItem672,
    GeeNest,
    LabComputerConsole,
    LabComputerConsoleGreenScreen,
    ChairYelllowPillow,
    OrangeWallWithHoleInMiddle,
    GreyWallWithHoleInMiddle,
    LongTable,
    GBAStation,
    TalkLinkToSupport,
    InstaWarp,
    LabInvisibleObject,
    LabGlassWindowDoor,
    UnknownItem700,
    LabCelingWarp,
    Ep4LightSource,
    Cacti,
    BigBrownRock,
    BreakableBrownRock,
    UnknownItem832,
    UnknownItem833,
    PoisonPlant,
    UnknownItem897,
    UnknownItem898,
    OozingDesertPlant,
    UnknownItem901,
    BigBlackRocks,
    UnknownItem903,
    UnknownItem904,
    UnknownItem905,
    UnknownItem906,
    FallingRock,
    DesertPlantHasCollision,
    DesertFixedTypeBoxBreakableCrystals,
    UnknownItem910,
    BeeHive,
    UnknownItem912,
    Heat,
    TopOfSaintMillionEgg,
    UnknownItem961,
}

export type ObjectTypeData = {
    readonly name: string;
    readonly pso_id?: number;
};

export const OBJECT_TYPES: ObjectType[] = [];

export function object_data(type: ObjectType): ObjectTypeData {
    return OBJECT_TYPE_DATA[type];
}

export function pso_id_to_object_type(psoId: number): ObjectType {
    switch (psoId) {
        default:
            return ObjectType.Unknown;

        case 0:
            return ObjectType.PlayerSet;
        case 1:
            return ObjectType.Particle;
        case 2:
            return ObjectType.Teleporter;
        case 3:
            return ObjectType.Warp;
        case 4:
            return ObjectType.LightCollision;
        case 5:
            return ObjectType.Item;
        case 6:
            return ObjectType.EnvSound;
        case 7:
            return ObjectType.FogCollision;
        case 8:
            return ObjectType.EventCollision;
        case 9:
            return ObjectType.CharaCollision;
        case 10:
            return ObjectType.ElementalTrap;
        case 11:
            return ObjectType.StatusTrap;
        case 12:
            return ObjectType.HealTrap;
        case 13:
            return ObjectType.LargeElementalTrap;
        case 14:
            return ObjectType.ObjRoomID;
        case 15:
            return ObjectType.Sensor;
        case 16:
            return ObjectType.UnknownItem16;
        case 17:
            return ObjectType.Lensflare;
        case 18:
            return ObjectType.ScriptCollision;
        case 19:
            return ObjectType.HealRing;
        case 20:
            return ObjectType.MapCollision;
        case 21:
            return ObjectType.ScriptCollisionA;
        case 22:
            return ObjectType.ItemLight;
        case 23:
            return ObjectType.RadarCollision;
        case 24:
            return ObjectType.FogCollisionSW;
        case 25:
            return ObjectType.BossTeleporter;
        case 26:
            return ObjectType.ImageBoard;
        case 27:
            return ObjectType.QuestWarp;
        case 28:
            return ObjectType.Epilogue;
        case 29:
            return ObjectType.UnknownItem29;
        case 30:
            return ObjectType.UnknownItem30;
        case 31:
            return ObjectType.UnknownItem31;
        case 32:
            return ObjectType.BoxDetectObject;
        case 33:
            return ObjectType.SymbolChatObject;
        case 34:
            return ObjectType.TouchPlateObject;
        case 35:
            return ObjectType.TargetableObject;
        case 36:
            return ObjectType.EffectObject;
        case 37:
            return ObjectType.CountDownObject;
        case 38:
            return ObjectType.UnknownItem38;
        case 39:
            return ObjectType.UnknownItem39;
        case 40:
            return ObjectType.UnknownItem40;
        case 41:
            return ObjectType.UnknownItem41;
        case 64:
            return ObjectType.MenuActivation;
        case 65:
            return ObjectType.TelepipeLocation;
        case 66:
            return ObjectType.BGMCollision;
        case 67:
            return ObjectType.MainRagolTeleporter;
        case 68:
            return ObjectType.LobbyTeleporter;
        case 69:
            return ObjectType.PrincipalWarp;
        case 70:
            return ObjectType.ShopDoor;
        case 71:
            return ObjectType.HuntersGuildDoor;
        case 72:
            return ObjectType.TeleporterDoor;
        case 73:
            return ObjectType.MedicalCenterDoor;
        case 74:
            return ObjectType.Elevator;
        case 75:
            return ObjectType.EasterEgg;
        case 76:
            return ObjectType.ValentinesHeart;
        case 77:
            return ObjectType.ChristmasTree;
        case 78:
            return ObjectType.ChristmasWreath;
        case 79:
            return ObjectType.HalloweenPumpkin;
        case 80:
            return ObjectType.TwentyFirstCentury;
        case 81:
            return ObjectType.Sonic;
        case 82:
            return ObjectType.WelcomeBoard;
        case 83:
            return ObjectType.Firework;
        case 84:
            return ObjectType.LobbyScreenDoor;
        case 85:
            return ObjectType.MainRagolTeleporterBattleInNextArea;
        case 86:
            return ObjectType.LabTeleporterDoor;
        case 87:
            return ObjectType.Pioneer2InvisibleTouchplate;
        case 128:
            return ObjectType.ForestDoor;
        case 129:
            return ObjectType.ForestSwitch;
        case 130:
            return ObjectType.LaserFence;
        case 131:
            return ObjectType.LaserSquareFence;
        case 132:
            return ObjectType.ForestLaserFenceSwitch;
        case 133:
            return ObjectType.LightRays;
        case 134:
            return ObjectType.BlueButterfly;
        case 135:
            return ObjectType.Probe;
        case 136:
            return ObjectType.RandomTypeBox1;
        case 137:
            return ObjectType.ForestWeatherStation;
        case 138:
            return ObjectType.Battery;
        case 139:
            return ObjectType.ForestConsole;
        case 140:
            return ObjectType.BlackSlidingDoor;
        case 141:
            return ObjectType.RicoMessagePod;
        case 142:
            return ObjectType.EnergyBarrier;
        case 143:
            return ObjectType.ForestRisingBridge;
        case 144:
            return ObjectType.SwitchNoneDoor;
        case 145:
            return ObjectType.EnemyBoxGrey;
        case 146:
            return ObjectType.FixedTypeBox;
        case 147:
            return ObjectType.EnemyBoxBrown;
        case 149:
            return ObjectType.EmptyTypeBox;
        case 150:
            return ObjectType.LaserFenseEx;
        case 151:
            return ObjectType.LaserSquareFenceEx;
        case 192:
            return ObjectType.FloorPanel1;
        case 193:
            return ObjectType.Caves4ButtonDoor;
        case 194:
            return ObjectType.CavesNormalDoor;
        case 195:
            return ObjectType.CavesSmashingPillar;
        case 196:
            return ObjectType.CavesSign1;
        case 197:
            return ObjectType.CavesSign2;
        case 198:
            return ObjectType.CavesSign3;
        case 199:
            return ObjectType.HexagalTank;
        case 200:
            return ObjectType.BrownPlatform;
        case 201:
            return ObjectType.WarningLightObject;
        case 203:
            return ObjectType.Rainbow;
        case 204:
            return ObjectType.FloatingJelifish;
        case 205:
            return ObjectType.FloatingDragonfly;
        case 206:
            return ObjectType.CavesSwitchDoor;
        case 207:
            return ObjectType.RobotRechargeStation;
        case 208:
            return ObjectType.CavesCakeShop;
        case 209:
            return ObjectType.Caves1SmallRedRock;
        case 210:
            return ObjectType.Caves1MediumRedRock;
        case 211:
            return ObjectType.Caves1LargeRedRock;
        case 212:
            return ObjectType.Caves2SmallRock1;
        case 213:
            return ObjectType.Caves2MediumRock1;
        case 214:
            return ObjectType.Caves2LargeRock1;
        case 215:
            return ObjectType.Caves2SmallRock2;
        case 216:
            return ObjectType.Caves2MediumRock2;
        case 217:
            return ObjectType.Caves2LargeRock2;
        case 218:
            return ObjectType.Caves3SmallRock;
        case 219:
            return ObjectType.Caves3MediumRock;
        case 220:
            return ObjectType.Caves3LargeRock;
        case 222:
            return ObjectType.FloorPanel2;
        case 223:
            return ObjectType.DestructableRockCaves1;
        case 224:
            return ObjectType.DestructableRockCaves2;
        case 225:
            return ObjectType.DestructableRockCaves3;
        case 256:
            return ObjectType.MinesDoor;
        case 257:
            return ObjectType.FloorPanel3;
        case 258:
            return ObjectType.MinesSwitchDoor;
        case 259:
            return ObjectType.LargeCryoTube;
        case 260:
            return ObjectType.ComputerLikeCalus;
        case 261:
            return ObjectType.GreenScreenOpeningAndClosing;
        case 262:
            return ObjectType.FloatingRobot;
        case 263:
            return ObjectType.FloatingBlueLight;
        case 264:
            return ObjectType.SelfDestructingObject1;
        case 265:
            return ObjectType.SelfDestructingObject2;
        case 266:
            return ObjectType.SelfDestructingObject3;
        case 267:
            return ObjectType.SparkMachine;
        case 268:
            return ObjectType.MinesLargeFlashingCrate;
        case 304:
            return ObjectType.RuinsSeal;
        case 320:
            return ObjectType.RuinsTeleporter;
        case 321:
            return ObjectType.RuinsWarpSiteToSite;
        case 322:
            return ObjectType.RuinsSwitch;
        case 323:
            return ObjectType.FloorPanel4;
        case 324:
            return ObjectType.Ruins1Door;
        case 325:
            return ObjectType.Ruins3Door;
        case 326:
            return ObjectType.Ruins2Door;
        case 327:
            return ObjectType.Ruins11ButtonDoor;
        case 328:
            return ObjectType.Ruins21ButtonDoor;
        case 329:
            return ObjectType.Ruins31ButtonDoor;
        case 330:
            return ObjectType.Ruins4ButtonDoor;
        case 331:
            return ObjectType.Ruins2ButtonDoor;
        case 332:
            return ObjectType.RuinsSensor;
        case 333:
            return ObjectType.RuinsFenceSwitch;
        case 334:
            return ObjectType.RuinsLaserFence4x2;
        case 335:
            return ObjectType.RuinsLaserFence6x2;
        case 336:
            return ObjectType.RuinsLaserFence4x4;
        case 337:
            return ObjectType.RuinsLaserFence6x4;
        case 338:
            return ObjectType.RuinsPoisonBlob;
        case 339:
            return ObjectType.RuinsPilarTrap;
        case 340:
            return ObjectType.PopupTrapNoTech;
        case 341:
            return ObjectType.RuinsCrystal;
        case 342:
            return ObjectType.Monument;
        case 345:
            return ObjectType.RuinsRock1;
        case 346:
            return ObjectType.RuinsRock2;
        case 347:
            return ObjectType.RuinsRock3;
        case 348:
            return ObjectType.RuinsRock4;
        case 349:
            return ObjectType.RuinsRock5;
        case 350:
            return ObjectType.RuinsRock6;
        case 351:
            return ObjectType.RuinsRock7;
        case 352:
            return ObjectType.Poison;
        case 353:
            return ObjectType.FixedBoxTypeRuins;
        case 354:
            return ObjectType.RandomBoxTypeRuins;
        case 355:
            return ObjectType.EnemyTypeBoxYellow;
        case 356:
            return ObjectType.EnemyTypeBoxBlue;
        case 357:
            return ObjectType.EmptyTypeBoxBlue;
        case 358:
            return ObjectType.DestructableRock;
        case 359:
            return ObjectType.PopupTrapsTechs;
        case 368:
            return ObjectType.FlyingWhiteBird;
        case 369:
            return ObjectType.Tower;
        case 370:
            return ObjectType.FloatingRocks;
        case 371:
            return ObjectType.FloatingSoul;
        case 372:
            return ObjectType.Butterfly;
        case 384:
            return ObjectType.LobbyGameMenu;
        case 385:
            return ObjectType.LobbyWarpObject;
        case 386:
            return ObjectType.Lobby1EventObjectDefaultTree;
        case 387:
            return ObjectType.UnknownItem387;
        case 388:
            return ObjectType.UnknownItem388;
        case 389:
            return ObjectType.UnknownItem389;
        case 390:
            return ObjectType.LobbyEventObjectStaticPumpkin;
        case 391:
            return ObjectType.LobbyEventObject3ChristmasWindows;
        case 392:
            return ObjectType.LobbyEventObjectRedAndWhiteCurtain;
        case 393:
            return ObjectType.UnknownItem393;
        case 394:
            return ObjectType.UnknownItem394;
        case 395:
            return ObjectType.LobbyFishTank;
        case 396:
            return ObjectType.LobbyEventObjectButterflies;
        case 400:
            return ObjectType.UnknownItem400;
        case 401:
            return ObjectType.GreyWallLow;
        case 402:
            return ObjectType.SpaceshipDoor;
        case 403:
            return ObjectType.GreyWallHigh;
        case 416:
            return ObjectType.TempleNormalDoor;
        case 417:
            return ObjectType.BreakableWallWallButUnbreakable;
        case 418:
            return ObjectType.BrokenCilinderAndRubble;
        case 419:
            return ObjectType.ThreeBrokenWallPiecesOnFloor;
        case 420:
            return ObjectType.HighBrickCilinder;
        case 421:
            return ObjectType.LyingCilinder;
        case 422:
            return ObjectType.BrickConeWithFlatTop;
        case 423:
            return ObjectType.BreakableTempleWall;
        case 424:
            return ObjectType.TempleMapDetect;
        case 425:
            return ObjectType.SmallBrownBrickRisingBridge;
        case 426:
            return ObjectType.LongRisingBridgeWithPinkHighEdges;
        case 427:
            return ObjectType.FourSwitchTempleDoor;
        case 448:
            return ObjectType.FourButtonSpaceshipDoor;
        case 512:
            return ObjectType.ItemBoxCca;
        case 513:
            return ObjectType.TeleporterEp2;
        case 514:
            return ObjectType.CCADoor;
        case 515:
            return ObjectType.SpecialBoxCCA;
        case 516:
            return ObjectType.BigCCADoor;
        case 517:
            return ObjectType.BigCCADoorSwitch;
        case 518:
            return ObjectType.LittleRock;
        case 519:
            return ObjectType.Little3StoneWall;
        case 520:
            return ObjectType.Medium3StoneWall;
        case 521:
            return ObjectType.SpiderPlant;
        case 522:
            return ObjectType.CCAAreaTeleporter;
        case 523:
            return ObjectType.UnknownItem523;
        case 524:
            return ObjectType.WhiteBird;
        case 525:
            return ObjectType.OrangeBird;
        case 527:
            return ObjectType.Saw;
        case 528:
            return ObjectType.LaserDetect;
        case 529:
            return ObjectType.UnknownItem529;
        case 530:
            return ObjectType.UnknownItem530;
        case 531:
            return ObjectType.Seagull;
        case 544:
            return ObjectType.Fish;
        case 545:
            return ObjectType.SeabedDoorWithBlueEdges;
        case 546:
            return ObjectType.SeabedDoorAlwaysOpenNonTriggerable;
        case 547:
            return ObjectType.LittleCryotube;
        case 548:
            return ObjectType.WideGlassWallBreakable;
        case 549:
            return ObjectType.BlueFloatingRobot;
        case 550:
            return ObjectType.RedFloatingRobot;
        case 551:
            return ObjectType.Dolphin;
        case 552:
            return ObjectType.CaptureTrap;
        case 553:
            return ObjectType.VRLink;
        case 576:
            return ObjectType.UnknownItem576;
        case 640:
            return ObjectType.WarpInBarbaRayRoom;
        case 672:
            return ObjectType.UnknownItem672;
        case 688:
            return ObjectType.GeeNest;
        case 689:
            return ObjectType.LabComputerConsole;
        case 690:
            return ObjectType.LabComputerConsoleGreenScreen;
        case 691:
            return ObjectType.ChairYelllowPillow;
        case 692:
            return ObjectType.OrangeWallWithHoleInMiddle;
        case 693:
            return ObjectType.GreyWallWithHoleInMiddle;
        case 694:
            return ObjectType.LongTable;
        case 695:
            return ObjectType.GBAStation;
        case 696:
            return ObjectType.TalkLinkToSupport;
        case 697:
            return ObjectType.InstaWarp;
        case 698:
            return ObjectType.LabInvisibleObject;
        case 699:
            return ObjectType.LabGlassWindowDoor;
        case 700:
            return ObjectType.UnknownItem700;
        case 701:
            return ObjectType.LabCelingWarp;
        case 768:
            return ObjectType.Ep4LightSource;
        case 769:
            return ObjectType.Cacti;
        case 770:
            return ObjectType.BigBrownRock;
        case 771:
            return ObjectType.BreakableBrownRock;
        case 832:
            return ObjectType.UnknownItem832;
        case 833:
            return ObjectType.UnknownItem833;
        case 896:
            return ObjectType.PoisonPlant;
        case 897:
            return ObjectType.UnknownItem897;
        case 898:
            return ObjectType.UnknownItem898;
        case 899:
            return ObjectType.OozingDesertPlant;
        case 901:
            return ObjectType.UnknownItem901;
        case 902:
            return ObjectType.BigBlackRocks;
        case 903:
            return ObjectType.UnknownItem903;
        case 904:
            return ObjectType.UnknownItem904;
        case 905:
            return ObjectType.UnknownItem905;
        case 906:
            return ObjectType.UnknownItem906;
        case 907:
            return ObjectType.FallingRock;
        case 908:
            return ObjectType.DesertPlantHasCollision;
        case 909:
            return ObjectType.DesertFixedTypeBoxBreakableCrystals;
        case 910:
            return ObjectType.UnknownItem910;
        case 911:
            return ObjectType.BeeHive;
        case 912:
            return ObjectType.UnknownItem912;
        case 913:
            return ObjectType.Heat;
        case 960:
            return ObjectType.TopOfSaintMillionEgg;
        case 961:
            return ObjectType.UnknownItem961;
    }
}

const OBJECT_TYPE_DATA: ObjectTypeData[] = [];

function define_object_type_data(
    object_type: ObjectType,
    pso_id: number | undefined,
    name: string,
): void {
    OBJECT_TYPES.push(object_type);
    OBJECT_TYPE_DATA[object_type] = {
        name,
        pso_id,
    };
}

define_object_type_data(ObjectType.Unknown, undefined, "Unknown");

define_object_type_data(ObjectType.PlayerSet, 0, "Player Set");
define_object_type_data(ObjectType.Particle, 1, "Particle");
define_object_type_data(ObjectType.Teleporter, 2, "Teleporter");
define_object_type_data(ObjectType.Warp, 3, "Warp");
define_object_type_data(ObjectType.LightCollision, 4, "Light Collision");
define_object_type_data(ObjectType.Item, 5, "Item");
define_object_type_data(ObjectType.EnvSound, 6, "Env Sound");
define_object_type_data(ObjectType.FogCollision, 7, "Fog Collision");
define_object_type_data(ObjectType.EventCollision, 8, "Event Collision");
define_object_type_data(ObjectType.CharaCollision, 9, "Chara Collision");
define_object_type_data(ObjectType.ElementalTrap, 10, "Elemental Trap");
define_object_type_data(ObjectType.StatusTrap, 11, "Status Trap");
define_object_type_data(ObjectType.HealTrap, 12, "Heal Trap");
define_object_type_data(ObjectType.LargeElementalTrap, 13, "Large Elemental Trap");
define_object_type_data(ObjectType.ObjRoomID, 14, "Obj Room ID");
define_object_type_data(ObjectType.Sensor, 15, "Sensor");
define_object_type_data(ObjectType.UnknownItem16, 16, "Unknown Item (16)");
define_object_type_data(ObjectType.Lensflare, 17, "Lensflare");
define_object_type_data(ObjectType.ScriptCollision, 18, "Script Collision");
define_object_type_data(ObjectType.HealRing, 19, "Heal Ring");
define_object_type_data(ObjectType.MapCollision, 20, "Map Collision");
define_object_type_data(ObjectType.ScriptCollisionA, 21, "Script Collision A");
define_object_type_data(ObjectType.ItemLight, 22, "Item Light");
define_object_type_data(ObjectType.RadarCollision, 23, "Radar Collision");
define_object_type_data(ObjectType.FogCollisionSW, 24, "Fog Collision SW");
define_object_type_data(ObjectType.BossTeleporter, 25, "Boss Teleporter");
define_object_type_data(ObjectType.ImageBoard, 26, "Image Board");
define_object_type_data(ObjectType.QuestWarp, 27, "Quest Warp");
define_object_type_data(ObjectType.Epilogue, 28, "Epilogue");
define_object_type_data(ObjectType.UnknownItem29, 29, "Unknown Item (29)");
define_object_type_data(ObjectType.UnknownItem30, 30, "Unknown Item (30)");
define_object_type_data(ObjectType.UnknownItem31, 31, "Unknown Item (31)");
define_object_type_data(ObjectType.BoxDetectObject, 32, "Box Detect Object");
define_object_type_data(ObjectType.SymbolChatObject, 33, "Symbol Chat Object");
define_object_type_data(ObjectType.TouchPlateObject, 34, "Touch plate Object");
define_object_type_data(ObjectType.TargetableObject, 35, "Targetable Object");
define_object_type_data(ObjectType.EffectObject, 36, "Effect object");
define_object_type_data(ObjectType.CountDownObject, 37, "Count Down Object");
define_object_type_data(ObjectType.UnknownItem38, 38, "Unknown Item (38)");
define_object_type_data(ObjectType.UnknownItem39, 39, "Unknown Item (39)");
define_object_type_data(ObjectType.UnknownItem40, 40, "Unknown Item (40)");
define_object_type_data(ObjectType.UnknownItem41, 41, "Unknown Item (41)");
define_object_type_data(ObjectType.MenuActivation, 64, "Menu activation");
define_object_type_data(ObjectType.TelepipeLocation, 65, "Telepipe Location");
define_object_type_data(ObjectType.BGMCollision, 66, "BGM Collision");
define_object_type_data(ObjectType.MainRagolTeleporter, 67, "Main Ragol Teleporter");
define_object_type_data(ObjectType.LobbyTeleporter, 68, "Lobby Teleporter");
define_object_type_data(ObjectType.PrincipalWarp, 69, "Principal warp");
define_object_type_data(ObjectType.ShopDoor, 70, "Shop Door");
define_object_type_data(ObjectType.HuntersGuildDoor, 71, "Hunter's Guild Door");
define_object_type_data(ObjectType.TeleporterDoor, 72, "Teleporter Door");
define_object_type_data(ObjectType.MedicalCenterDoor, 73, "Medical Center Door");
define_object_type_data(ObjectType.Elevator, 74, "Elevator");
define_object_type_data(ObjectType.EasterEgg, 75, "Easter Egg");
define_object_type_data(ObjectType.ValentinesHeart, 76, "Valentines Heart");
define_object_type_data(ObjectType.ChristmasTree, 77, "Christmas Tree");
define_object_type_data(ObjectType.ChristmasWreath, 78, "Christmas Wreath");
define_object_type_data(ObjectType.HalloweenPumpkin, 79, "Halloween Pumpkin");
define_object_type_data(ObjectType.TwentyFirstCentury, 80, "21st Century");
define_object_type_data(ObjectType.Sonic, 81, "Sonic");
define_object_type_data(ObjectType.WelcomeBoard, 82, "Welcome Board");
define_object_type_data(ObjectType.Firework, 83, "Firework");
define_object_type_data(ObjectType.LobbyScreenDoor, 84, "Lobby Screen Door");
define_object_type_data(
    ObjectType.MainRagolTeleporterBattleInNextArea,
    85,
    "Main Ragol Teleporter (Battle in next area?)",
);
define_object_type_data(ObjectType.LabTeleporterDoor, 86, "Lab Teleporter Door");
define_object_type_data(
    ObjectType.Pioneer2InvisibleTouchplate,
    87,
    "Pioneer 2 Invisible Touchplate",
);
define_object_type_data(ObjectType.ForestDoor, 128, "Forest Door");
define_object_type_data(ObjectType.ForestSwitch, 129, "Forest Switch");
define_object_type_data(ObjectType.LaserFence, 130, "Laser Fence");
define_object_type_data(ObjectType.LaserSquareFence, 131, "Laser Square Fence");
define_object_type_data(ObjectType.ForestLaserFenceSwitch, 132, "Forest Laser Fence Switch");
define_object_type_data(ObjectType.LightRays, 133, "Light rays");
define_object_type_data(ObjectType.BlueButterfly, 134, "Blue Butterfly");
define_object_type_data(ObjectType.Probe, 135, "Probe");
define_object_type_data(ObjectType.RandomTypeBox1, 136, "Random Type Box 1");
define_object_type_data(ObjectType.ForestWeatherStation, 137, "Forest Weather Station");
define_object_type_data(ObjectType.Battery, 138, "Battery");
define_object_type_data(ObjectType.ForestConsole, 139, "Forest Console");
define_object_type_data(ObjectType.BlackSlidingDoor, 140, "Black Sliding Door");
define_object_type_data(ObjectType.RicoMessagePod, 141, "Rico Message Pod");
define_object_type_data(ObjectType.EnergyBarrier, 142, "Energy Barrier");
define_object_type_data(ObjectType.ForestRisingBridge, 143, "Forest Rising Bridge");
define_object_type_data(ObjectType.SwitchNoneDoor, 144, "Switch (none door)");
define_object_type_data(ObjectType.EnemyBoxGrey, 145, "Enemy Box (Grey)");
define_object_type_data(ObjectType.FixedTypeBox, 146, "Fixed Type Box");
define_object_type_data(ObjectType.EnemyBoxBrown, 147, "Enemy Box (Brown)");
define_object_type_data(ObjectType.EmptyTypeBox, 149, "Empty Type Box");
define_object_type_data(ObjectType.LaserFenseEx, 150, "Laser Fense Ex");
define_object_type_data(ObjectType.LaserSquareFenceEx, 151, "Laser Square Fence Ex");
define_object_type_data(ObjectType.FloorPanel1, 192, "Floor Panel 1");
define_object_type_data(ObjectType.Caves4ButtonDoor, 193, "Caves 4 Button door");
define_object_type_data(ObjectType.CavesNormalDoor, 194, "Caves Normal door");
define_object_type_data(ObjectType.CavesSmashingPillar, 195, "Caves Smashing Pillar");
define_object_type_data(ObjectType.CavesSign1, 196, "Caves Sign 1");
define_object_type_data(ObjectType.CavesSign2, 197, "Caves Sign 2");
define_object_type_data(ObjectType.CavesSign3, 198, "Caves Sign 3");
define_object_type_data(ObjectType.HexagalTank, 199, "Hexagal Tank");
define_object_type_data(ObjectType.BrownPlatform, 200, "Brown Platform");
define_object_type_data(ObjectType.WarningLightObject, 201, "Warning Light Object");
define_object_type_data(ObjectType.Rainbow, 203, "Rainbow");
define_object_type_data(ObjectType.FloatingJelifish, 204, "Floating Jelifish");
define_object_type_data(ObjectType.FloatingDragonfly, 205, "Floating Dragonfly");
define_object_type_data(ObjectType.CavesSwitchDoor, 206, "Caves Switch Door");
define_object_type_data(ObjectType.RobotRechargeStation, 207, "Robot Recharge Station");
define_object_type_data(ObjectType.CavesCakeShop, 208, "Caves Cake Shop");
define_object_type_data(ObjectType.Caves1SmallRedRock, 209, "Caves 1 Small Red Rock");
define_object_type_data(ObjectType.Caves1MediumRedRock, 210, "Caves 1 Medium Red Rock");
define_object_type_data(ObjectType.Caves1LargeRedRock, 211, "Caves 1 Large Red Rock");
define_object_type_data(ObjectType.Caves2SmallRock1, 212, "Caves 2 Small Rock 1");
define_object_type_data(ObjectType.Caves2MediumRock1, 213, "Caves 2 Medium Rock 1");
define_object_type_data(ObjectType.Caves2LargeRock1, 214, "Caves 2 Large Rock 1");
define_object_type_data(ObjectType.Caves2SmallRock2, 215, "Caves 2 Small Rock 2");
define_object_type_data(ObjectType.Caves2MediumRock2, 216, "Caves 2 Medium Rock 2");
define_object_type_data(ObjectType.Caves2LargeRock2, 217, "Caves 2 Large Rock 2");
define_object_type_data(ObjectType.Caves3SmallRock, 218, "Caves 3 Small Rock");
define_object_type_data(ObjectType.Caves3MediumRock, 219, "Caves 3 Medium Rock");
define_object_type_data(ObjectType.Caves3LargeRock, 220, "Caves 3 Large Rock");
define_object_type_data(ObjectType.FloorPanel2, 222, "Floor Panel 2");
define_object_type_data(ObjectType.DestructableRockCaves1, 223, "Destructable Rock (Caves 1)");
define_object_type_data(ObjectType.DestructableRockCaves2, 224, "Destructable Rock (Caves 2)");
define_object_type_data(ObjectType.DestructableRockCaves3, 225, "Destructable Rock (Caves 3)");
define_object_type_data(ObjectType.MinesDoor, 256, "Mines Door");
define_object_type_data(ObjectType.FloorPanel3, 257, "Floor Panel 3");
define_object_type_data(ObjectType.MinesSwitchDoor, 258, "Mines Switch Door");
define_object_type_data(ObjectType.LargeCryoTube, 259, "Large Cryo-Tube");
define_object_type_data(ObjectType.ComputerLikeCalus, 260, "Computer (like calus)");
define_object_type_data(
    ObjectType.GreenScreenOpeningAndClosing,
    261,
    "Green Screen opening and closing",
);
define_object_type_data(ObjectType.FloatingRobot, 262, "Floating Robot");
define_object_type_data(ObjectType.FloatingBlueLight, 263, "Floating Blue Light");
define_object_type_data(ObjectType.SelfDestructingObject1, 264, "Self Destructing Object 1");
define_object_type_data(ObjectType.SelfDestructingObject2, 265, "Self Destructing Object 2");
define_object_type_data(ObjectType.SelfDestructingObject3, 266, "Self Destructing Object 3");
define_object_type_data(ObjectType.SparkMachine, 267, "Spark Machine");
define_object_type_data(ObjectType.MinesLargeFlashingCrate, 268, "Mines Large Flashing Crate");
define_object_type_data(ObjectType.RuinsSeal, 304, "Ruins Seal");
define_object_type_data(ObjectType.RuinsTeleporter, 320, "Ruins Teleporter");
define_object_type_data(ObjectType.RuinsWarpSiteToSite, 321, "Ruins Warp (Site to site)");
define_object_type_data(ObjectType.RuinsSwitch, 322, "Ruins Switch");
define_object_type_data(ObjectType.FloorPanel4, 323, "Floor Panel 4");
define_object_type_data(ObjectType.Ruins1Door, 324, "Ruins 1 Door");
define_object_type_data(ObjectType.Ruins3Door, 325, "Ruins 3 Door");
define_object_type_data(ObjectType.Ruins2Door, 326, "Ruins 2 Door");
define_object_type_data(ObjectType.Ruins11ButtonDoor, 327, "Ruins 1-1 Button Door");
define_object_type_data(ObjectType.Ruins21ButtonDoor, 328, "Ruins 2-1 Button Door");
define_object_type_data(ObjectType.Ruins31ButtonDoor, 329, "Ruins 3-1 Button Door");
define_object_type_data(ObjectType.Ruins4ButtonDoor, 330, "Ruins 4-Button Door");
define_object_type_data(ObjectType.Ruins2ButtonDoor, 331, "Ruins 2-Button Door");
define_object_type_data(ObjectType.RuinsSensor, 332, "Ruins Sensor");
define_object_type_data(ObjectType.RuinsFenceSwitch, 333, "Ruins Fence Switch");
define_object_type_data(ObjectType.RuinsLaserFence4x2, 334, "Ruins Laser Fence 4x2");
define_object_type_data(ObjectType.RuinsLaserFence6x2, 335, "Ruins Laser Fence 6x2");
define_object_type_data(ObjectType.RuinsLaserFence4x4, 336, "Ruins Laser Fence 4x4");
define_object_type_data(ObjectType.RuinsLaserFence6x4, 337, "Ruins Laser Fence 6x4");
define_object_type_data(ObjectType.RuinsPoisonBlob, 338, "Ruins poison Blob");
define_object_type_data(ObjectType.RuinsPilarTrap, 339, "Ruins Pilar Trap");
define_object_type_data(ObjectType.PopupTrapNoTech, 340, "Popup Trap (No Tech)");
define_object_type_data(ObjectType.RuinsCrystal, 341, "Ruins Crystal");
define_object_type_data(ObjectType.Monument, 342, "Monument");
define_object_type_data(ObjectType.RuinsRock1, 345, "Ruins Rock 1");
define_object_type_data(ObjectType.RuinsRock2, 346, "Ruins Rock 2");
define_object_type_data(ObjectType.RuinsRock3, 347, "Ruins Rock 3");
define_object_type_data(ObjectType.RuinsRock4, 348, "Ruins Rock 4");
define_object_type_data(ObjectType.RuinsRock5, 349, "Ruins Rock 5");
define_object_type_data(ObjectType.RuinsRock6, 350, "Ruins Rock 6");
define_object_type_data(ObjectType.RuinsRock7, 351, "Ruins Rock 7");
define_object_type_data(ObjectType.Poison, 352, "Poison");
define_object_type_data(ObjectType.FixedBoxTypeRuins, 353, "Fixed Box Type (Ruins)");
define_object_type_data(ObjectType.RandomBoxTypeRuins, 354, "Random Box Type (Ruins)");
define_object_type_data(ObjectType.EnemyTypeBoxYellow, 355, "Enemy Type Box (Yellow)");
define_object_type_data(ObjectType.EnemyTypeBoxBlue, 356, "Enemy Type Box (Blue)");
define_object_type_data(ObjectType.EmptyTypeBoxBlue, 357, "Empty Type Box (Blue)");
define_object_type_data(ObjectType.DestructableRock, 358, "Destructable Rock");
define_object_type_data(ObjectType.PopupTrapsTechs, 359, "Popup Traps (techs)");
define_object_type_data(ObjectType.FlyingWhiteBird, 368, "Flying White Bird");
define_object_type_data(ObjectType.Tower, 369, "Tower");
define_object_type_data(ObjectType.FloatingRocks, 370, "Floating Rocks");
define_object_type_data(ObjectType.FloatingSoul, 371, "Floating Soul");
define_object_type_data(ObjectType.Butterfly, 372, "Butterfly");
define_object_type_data(ObjectType.LobbyGameMenu, 384, "Lobby Game menu");
define_object_type_data(ObjectType.LobbyWarpObject, 385, "Lobby Warp Object");
define_object_type_data(
    ObjectType.Lobby1EventObjectDefaultTree,
    386,
    "Lobby 1 Event Object (Default Tree)",
);
define_object_type_data(ObjectType.UnknownItem387, 387, "Unknown Item (387)");
define_object_type_data(ObjectType.UnknownItem388, 388, "Unknown Item (388)");
define_object_type_data(ObjectType.UnknownItem389, 389, "Unknown Item (389)");
define_object_type_data(
    ObjectType.LobbyEventObjectStaticPumpkin,
    390,
    "Lobby Event Object (Static Pumpkin)",
);
define_object_type_data(
    ObjectType.LobbyEventObject3ChristmasWindows,
    391,
    "Lobby Event Object (3 Christmas Windows)",
);
define_object_type_data(
    ObjectType.LobbyEventObjectRedAndWhiteCurtain,
    392,
    "Lobby Event Object (Red and White Curtain)",
);
define_object_type_data(ObjectType.UnknownItem393, 393, "Unknown Item (393)");
define_object_type_data(ObjectType.UnknownItem394, 394, "Unknown Item (394)");
define_object_type_data(ObjectType.LobbyFishTank, 395, "Lobby Fish Tank");
define_object_type_data(
    ObjectType.LobbyEventObjectButterflies,
    396,
    "Lobby Event Object (Butterflies)",
);
define_object_type_data(ObjectType.UnknownItem400, 400, "Unknown Item (400)");
define_object_type_data(ObjectType.GreyWallLow, 401, "grey wall low");
define_object_type_data(ObjectType.SpaceshipDoor, 402, "Spaceship Door");
define_object_type_data(ObjectType.GreyWallHigh, 403, "grey wall high");
define_object_type_data(ObjectType.TempleNormalDoor, 416, "Temple Normal Door");
define_object_type_data(
    ObjectType.BreakableWallWallButUnbreakable,
    417,
    '"breakable wall wall, but unbreakable"',
);
define_object_type_data(ObjectType.BrokenCilinderAndRubble, 418, "Broken cilinder and rubble");
define_object_type_data(
    ObjectType.ThreeBrokenWallPiecesOnFloor,
    419,
    "3 broken wall pieces on floor",
);
define_object_type_data(ObjectType.HighBrickCilinder, 420, "high brick cilinder");
define_object_type_data(ObjectType.LyingCilinder, 421, "lying cilinder");
define_object_type_data(ObjectType.BrickConeWithFlatTop, 422, "brick cone with flat top");
define_object_type_data(ObjectType.BreakableTempleWall, 423, "breakable temple wall");
define_object_type_data(ObjectType.TempleMapDetect, 424, "Temple Map Detect");
define_object_type_data(
    ObjectType.SmallBrownBrickRisingBridge,
    425,
    "small brown brick rising bridge",
);
define_object_type_data(
    ObjectType.LongRisingBridgeWithPinkHighEdges,
    426,
    "long rising bridge (with pink high edges)",
);
define_object_type_data(ObjectType.FourSwitchTempleDoor, 427, "4 switch temple door");
define_object_type_data(ObjectType.FourButtonSpaceshipDoor, 448, "4 button spaceship door");
define_object_type_data(ObjectType.ItemBoxCca, 512, "item box cca");
define_object_type_data(ObjectType.TeleporterEp2, 513, "Teleporter (Ep 2)");
define_object_type_data(ObjectType.CCADoor, 514, "CCA Door");
define_object_type_data(ObjectType.SpecialBoxCCA, 515, "Special Box CCA");
define_object_type_data(ObjectType.BigCCADoor, 516, "Big CCA Door");
define_object_type_data(ObjectType.BigCCADoorSwitch, 517, "Big CCA Door Switch");
define_object_type_data(ObjectType.LittleRock, 518, "Little Rock");
define_object_type_data(ObjectType.Little3StoneWall, 519, "Little 3 Stone Wall");
define_object_type_data(ObjectType.Medium3StoneWall, 520, "Medium 3 stone wall");
define_object_type_data(ObjectType.SpiderPlant, 521, "Spider Plant");
define_object_type_data(ObjectType.CCAAreaTeleporter, 522, "CCA Area Teleporter");
define_object_type_data(ObjectType.UnknownItem523, 523, "Unknown Item (523)");
define_object_type_data(ObjectType.WhiteBird, 524, "White Bird");
define_object_type_data(ObjectType.OrangeBird, 525, "Orange Bird");
define_object_type_data(ObjectType.Saw, 527, "Saw");
define_object_type_data(ObjectType.LaserDetect, 528, "Laser Detect");
define_object_type_data(ObjectType.UnknownItem529, 529, "Unknown Item (529)");
define_object_type_data(ObjectType.UnknownItem530, 530, "Unknown Item (530)");
define_object_type_data(ObjectType.Seagull, 531, "Seagull");
define_object_type_data(ObjectType.Fish, 544, "Fish");
define_object_type_data(ObjectType.SeabedDoorWithBlueEdges, 545, "Seabed Door (with blue edges)");
define_object_type_data(
    ObjectType.SeabedDoorAlwaysOpenNonTriggerable,
    546,
    "Seabed door (always open, non-triggerable)",
);
define_object_type_data(ObjectType.LittleCryotube, 547, "Little Cryotube");
define_object_type_data(ObjectType.WideGlassWallBreakable, 548, "Wide Glass Wall (breakable)");
define_object_type_data(ObjectType.BlueFloatingRobot, 549, "Blue floating robot");
define_object_type_data(ObjectType.RedFloatingRobot, 550, "Red floating robot");
define_object_type_data(ObjectType.Dolphin, 551, "Dolphin");
define_object_type_data(ObjectType.CaptureTrap, 552, "Capture Trap");
define_object_type_data(ObjectType.VRLink, 553, "VR link");
define_object_type_data(ObjectType.UnknownItem576, 576, "Unknown Item (576)");
define_object_type_data(ObjectType.WarpInBarbaRayRoom, 640, "Warp in Barba Ray Room");
define_object_type_data(ObjectType.UnknownItem672, 672, "Unknown Item (672)");
define_object_type_data(ObjectType.GeeNest, 688, "Gee Nest");
define_object_type_data(ObjectType.LabComputerConsole, 689, "Lab Computer Console");
define_object_type_data(
    ObjectType.LabComputerConsoleGreenScreen,
    690,
    "Lab Computer Console (Green Screen)",
);
define_object_type_data(ObjectType.ChairYelllowPillow, 691, "Chair, Yelllow Pillow");
define_object_type_data(
    ObjectType.OrangeWallWithHoleInMiddle,
    692,
    "orange wall with hole in middle",
);
define_object_type_data(ObjectType.GreyWallWithHoleInMiddle, 693, "grey wall with hole in middle");
define_object_type_data(ObjectType.LongTable, 694, "long table");
define_object_type_data(ObjectType.GBAStation, 695, "GBA Station");
define_object_type_data(ObjectType.TalkLinkToSupport, 696, "Talk (link to support)");
define_object_type_data(ObjectType.InstaWarp, 697, "insta-warp");
define_object_type_data(ObjectType.LabInvisibleObject, 698, "Lab Invisible Object");
define_object_type_data(ObjectType.LabGlassWindowDoor, 699, "Lab Glass window Door");
define_object_type_data(ObjectType.UnknownItem700, 700, "Unknown Item (700)");
define_object_type_data(ObjectType.LabCelingWarp, 701, "Lab Celing Warp");
define_object_type_data(ObjectType.Ep4LightSource, 768, "Ep4 Light Source");
define_object_type_data(ObjectType.Cacti, 769, "cacti");
define_object_type_data(ObjectType.BigBrownRock, 770, "Big Brown Rock");
define_object_type_data(ObjectType.BreakableBrownRock, 771, "Breakable Brown Rock");
define_object_type_data(ObjectType.UnknownItem832, 832, "Unknown Item (832)");
define_object_type_data(ObjectType.UnknownItem833, 833, "Unknown Item (833)");
define_object_type_data(ObjectType.PoisonPlant, 896, "Poison Plant");
define_object_type_data(ObjectType.UnknownItem897, 897, "Unknown Item (897)");
define_object_type_data(ObjectType.UnknownItem898, 898, "Unknown Item (898)");
define_object_type_data(ObjectType.OozingDesertPlant, 899, "Oozing Desert Plant");
define_object_type_data(ObjectType.UnknownItem901, 901, "Unknown Item (901)");
define_object_type_data(ObjectType.BigBlackRocks, 902, "big black rocks");
define_object_type_data(ObjectType.UnknownItem903, 903, "Unknown Item (903)");
define_object_type_data(ObjectType.UnknownItem904, 904, "Unknown Item (904)");
define_object_type_data(ObjectType.UnknownItem905, 905, "Unknown Item (905)");
define_object_type_data(ObjectType.UnknownItem906, 906, "Unknown Item (906)");
define_object_type_data(ObjectType.FallingRock, 907, "Falling Rock");
define_object_type_data(ObjectType.DesertPlantHasCollision, 908, "Desert Plant (has collision)");
define_object_type_data(
    ObjectType.DesertFixedTypeBoxBreakableCrystals,
    909,
    "Desert Fixed Type Box (Breakable Crystals)",
);
define_object_type_data(ObjectType.UnknownItem910, 910, "Unknown Item (910)");
define_object_type_data(ObjectType.BeeHive, 911, "Bee Hive");
define_object_type_data(ObjectType.UnknownItem912, 912, "Unknown Item (912)");
define_object_type_data(ObjectType.Heat, 913, "Heat");
define_object_type_data(ObjectType.TopOfSaintMillionEgg, 960, "Top of saint million egg");
define_object_type_data(ObjectType.UnknownItem961, 961, "Unknown Item (961)");
