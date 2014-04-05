SandHEX = Ember.Application.create({
	LOG_TRANSITIONS: true
});
SandHEX.ApplicationAdapter = DS.FixtureAdapter.extend();
SandHEX.store = DS.Store.create({
	revision: 11,
	adapter: 'DS.fixtureAdapter'
});
