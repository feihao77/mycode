// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "SalaryCalculator",
    platforms: [.iOS(.v16)],
    products: [
        .library(name: "SalaryCalculator", targets: ["SalaryCalculator"]),
    ],
    dependencies: [
        .package(url: "https://github.com/airbnb/lottie-spm.git", from: "4.2.0"),
    ],
    targets: [
        .target(
            name: "SalaryCalculator",
            dependencies: [
                .product(name: "Lottie", package: "lottie-spm")
            ]
        )
    ]
)