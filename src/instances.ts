import ora from 'ora';
import inquirerLocal from 'inquirer';

inquirerLocal.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

export const inquirer = inquirerLocal;

export const spinner = ora();
