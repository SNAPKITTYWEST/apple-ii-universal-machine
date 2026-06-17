import Foundation

@_cdecl("boot")
public func boot() -> UnsafePointer<CChar> {
    let runtime = Runtime()
    let result = runtime.boot()
    return (result as NSString).utf8String!
}

@_cdecl("status")
public func status() -> UnsafePointer<CChar> {
    let runtime = Runtime()
    let result = runtime.status()
    return (result as NSString).utf8String!
}

@_cdecl("trust")
public func trust(command: UnsafePointer<CChar>) -> UnsafePointer<CChar> {
    let contract = TrustContract()
    let cmd = String(cString: command)
    let result: TrustContract.Result
    switch cmd {
    case "boot": result = contract.canBoot()
    case "debate": result = contract.canRunDebate()
    case "lisp": result = contract.canInvokeLisp()
    case "runtime": result = contract.canInvokeRuntime()
    default: result = TrustContract.Result(allowed: true, contract: "default", reason: "Pass-through")
    }
    let output = "{\"\(result.contract)\": \"\(result.allowed ? "ALLOWED" : "DENIED")\"}"
    return (output as NSString).utf8String!
}

@_cdecl("evalLisp")
public func evalLisp(expression: UnsafePointer<CChar>) -> UnsafePointer<CChar> {
    let machine = LispMachine()
    let expr = String(cString: expression)
    let result = machine.eval(expr)
    return (result as NSString).utf8String!
}

@_cdecl("createSealPayload")
public func createSealPayload(command: UnsafePointer<CChar>, output: UnsafePointer<CChar>) -> UnsafePointer<CChar> {
    let seal = WozSeal()
    let cmd = String(cString: command)
    let out = String(cString: output)
    let payload = "\(cmd):\(out)"
    let result = seal.createSeal(payload: payload)
    return (result.hash as NSString).utf8String!
}

@_cdecl("agentStatus")
public func agentStatus() -> UnsafePointer<CChar> {
    let result = """
    ENKI: active (simulated) — tension proposer
    SENTINEL: active (simulated) — claim auditor
    STATUS: all agents local, no remote calls
    """
    return (result as NSString).utf8String!
}
