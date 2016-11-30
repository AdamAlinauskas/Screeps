var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var roleRepair = require('role.repair');

module.exports.loop = function () {

//  var tower = Game.getObjectById('TOWER_ID');
//     if(tower) {
//         var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
//             filter: (structure) => structure.hits < structure.hitsMax
//         });
//         if(closestDamagedStructure) {
//             tower.repair(closestDamagedStructure);
//         }

//         var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//         if(closestHostile) {
//             tower.attack(closestHostile);
//         }
//     }
 

    for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

    //Get number of extensions useful for creating screeps to know how many body parts.
    
    var numberOfExtensions = 0;

    if(Game.creeps.length > 1)
    {
        var numberOfExtensions = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION);
                        }}).length;
    }

    
    roleAttacker.create(Game);
    roleRepair.create(Game);
    roleBuilder.create(Game);
    roleUpgrader.create(Game);
    roleHarvester.create(Game);
    

     for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }//attacker
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
        roleRepair.run(creep);
    }
    
/*
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    
   
    
  roleHarvester.create(Game); 
    roleUpgrader.create(Game);
    roleBuilder.create(Game);

    

  
    
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        
        if(creep.memory.role == 'upgrader') {
            roleBuilder.run(creep);
        }

        
    }
    
    */
}