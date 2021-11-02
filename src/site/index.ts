/* eslint-disable dot-notation */
import { createElement } from '../lib'
import Application from '../lib/Application'
import projects from './projects'

const root: HTMLDivElement = document.getElementById('root') as HTMLDivElement
const content: HTMLDivElement = document.getElementById('content') as HTMLDivElement
const modal: HTMLDivElement = document.getElementById('modal') as HTMLDivElement
const app: Application = new Application(root, content, modal, projects)
