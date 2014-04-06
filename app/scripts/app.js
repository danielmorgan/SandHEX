SandHEX = Ember.Application.create();

SandHEX.ApplicationSerializer = DS.LSSerializer.extend();
SandHEX.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'SandHEX.Save'
});
