import { mpapi } from 'mineplex-rpcapi'
import { NODE_RPC_DEBUG, NODE_RPC_URL } from './config'

mpapi.node.setProvider(NODE_RPC_URL)
mpapi.node.setDebugMode(NODE_RPC_DEBUG)

export default mpapi
