import Foundation
import CryptoKit

public struct WozSeal {
    public init() {}

    public struct SealResult {
        public let hash: String
        public let timestamp: String
        public let payload: String
    }

    public func createSeal(payload: String) -> SealResult {
        let timestamp = ISO8601DateFormatter().string(from: Date())
        let raw = payload + "|" + timestamp
        let digest = SHA256.hash(data: Data(raw.utf8))
        let hash = digest.map { String(format: "%02x", $0) }.joined()
        return SealResult(hash: hash, timestamp: timestamp, payload: payload)
    }
}
