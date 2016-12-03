var roleUpgrader = require('role.upgrader');
var creepHelper = require('creep.helper');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);

			//Find closest
			var source = creep.pos.findClosestByRange(creep.room.find(FIND_SOURCES))
				
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
		//else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            else{
                
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });

        

            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(targets[0]);
            }
        }

        var atMaxEnergy = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);
                    }
            }).every(function(structure){return structure.energy == structure.energyCapacity});

        
        if(atMaxEnergy){
            //Spawn's enerty is maxed out put harvester to use and upgrade the conrollers
            creep.say('Swiching to upgrading')
            roleUpgrader.upgrade(creep);
        }
      
	},
		
	create: function(game,potentialEnergyStored){
        creepHelper.Create('harvester',potentialEnergyStored);
	}
};

module.exports = roleHarvester;