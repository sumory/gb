#!/usr/bin/env node

var commander = require('commander');
var fs = require('fs');
var path = require('path');
var beauty = require('beauty');
var version = require('./package.json').version;
var Github = require('./lib/github.js');
var utils = require('./lib/utils.js');

beauty.beautifyConsole();
var theme = {
	'log': ['blue'],
	'info': ['cyan'],
	'warn': ['yellow'],
	'error': ['red', 'bold', 'underline']
};
beauty.setTheme(theme);

var github = new Github();

commander.version(version);
commander.on('--help', function() {
	var usage = [
		'',
		'  Usages:',
		'',
		'    gb config  [config Github account]',
		'    gb info  [view my Github account]',
		'    gb list -s <page>,<page_no>  [view starred repos, pagination is optional.]',
		'    gb search -r <keyword>,<page>,<page_no>  [search repos with keyword, pagination is optional.]',
		'',
		'  Demos:',
		'',
		'    gb config  [config Github account]',
		'    gb info  [view my Github account]',
		'    gb list -s 2,10  [view 10 starred repos on page 2.]',
		'    gb search -r "sumory",1,5  [search repos with "sumory". show 5 items on page 1.]',
		'',
		'  find more info - github.com/sumory/gb',
		''
	].join('\n');

	console.info(usage);
});


commander
	.command('config')
	.description('config github account')
	.action(function() {
		console.warn('Config Github account.');
		utils.config(github);
	});

commander
	.command('list')
	.description('list repos etc.')
	.option('-s, --pagination <page>,<per_page>', 'List starred projects(supports pagination)', utils.splitArgs)
	.action(function(env) {
		var pagination=[];
		if(env.pagination)
			 pagination = env.pagination;

		utils.tryAuth(github, function() {
			github.list(pagination[0]||1, pagination[1] || 10, function(err, stars) {
				if(err) return console.error(err);
				stars.forEach(function(item) {
					console.log(item['full_name']);
				});

			});

		});
	});


commander
	.command('search')
	.description('search for repos')
	.option('-r, --repos <keyword>,<page>,<per_page>', 'Search with keyword', utils.splitArgs)
	.action(function(env) {
		var repos = env.repos;
		utils.tryAuth(github, function() {
			github.search(repos[0],repos[1]||1, repos[2] || 10, function(err, result) {
				console.error('total_count: ', result.total_count);
				result.items.forEach(function(item) {
					console.log(item.full_name);
				});

			});
		});
	});

commander
	.command('info')
	.description('detail of account')
	.action(function() {
		utils.tryAuth(github, function() {
			github.info(function(err, info) {
				console.error('name: ' + info.login);
				console.info('public repos: ' + info.public_repos);
				console.info('followers: ' + info.followers);
				console.info('following: ' + info.following);

			});
		});
	});

commander.parse(process.argv);