var roleUpgrader = require('role.upgrader');

var roleName = 'repair';

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.role != roleName)
            return;
        

        var repairitnow = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < 650 && structure.hits > 0)
            }
        });

        if (repairitnow.length > 0) {
            if (creep.repair(repairitnow[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repairitnow[0]);
            }
        } else {

            var repairit = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax && structure.hits > 0 && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART)
                }
            });

            var repairwall = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax && structure.hits > 0 || structure.hits < structure.hitsMax && structure.hits > 0 && structure.structureType == STRUCTURE_WALL)
                }
            });

            if (repairit.length > 0) {
                if (creep.repair(repairit[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairit[0]);
                }
            } else {

                if (repairwall.length > 0) {
                    if (creep.repair(repairwall[repairwall.length - 1]) == ERR_NOT_IN_RANGE) { //omgekeerde volgorde zodat ramparts eerst gerepaird worden
                        creep.moveTo(repairwall[0]);
                    }
                } else {
                    creep.say('Swiching to upgrading')
                    roleUpgrader.upgrade(creep); // so it will alway's will be busy. DO NOT FORGET TO IMPORT(var roleHarvester = require('role.harvester');) IT 
                }
            }
        }
      
	},
		
	create: function(game){
	   var upgraders = _.filter(game.creeps,(creep)=>creep.memory.role === roleName);
	    if(upgraders.length < 4){
	        game.spawns.Spawn1.createCreep([MOVE, CARRY, WORK],{role:roleName})
	    }
	}
};

module.exports = roleHarvester;