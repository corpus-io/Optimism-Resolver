import { getResolverInterface } from "../../../utils/getResolverInterface";
import { decodeText } from "../text/decodeText";
import { decodeAddr } from "../addr/decodeAddr";

export function decodeCcipRequest(calldata: string) {
    try {
        const textResolver = getResolverInterface();

        //Parse the calldata returned by a contra
        const [ensName, data] = textResolver.parseTransaction({
            data: calldata,
        }).args;

        const { signature, args } = textResolver.parseTransaction({
            data,
        });

        switch (signature) {
            case "text(bytes32,string)":
                return { signature, request: decodeText(ensName, args) };
            case "addr(bytes32)": {
                return { signature, request: decodeAddr(ensName, args) };
            }

            default:
                return { signature, request: null };
        }
    } catch (err: any) {
        console.log("[Decode Calldata] Can't decode calldata ");
        console.log(err);
        throw err;
    }
}
