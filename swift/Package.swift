// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "AppleIIRuntime",
    platforms: [.macOS(.v13)],
    products: [
        .library(name: "AppleIIRuntime", targets: ["AppleIIRuntime"])
    ],
    targets: [
        .target(
            name: "AppleIIRuntime",
            path: "Sources/AppleIIRuntime"
        )
    ]
)
