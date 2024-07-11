{
  description = "Flake for human rescue program developed at UC3M";

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
    in
    {
      devShells.${system}.default =
        with import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
        mkShell {
          packages = [
            terraform
            awscli2

            nodePackages.nodejs
            nodePackages.pnpm

            insomnia
            dbeaver-bin

            # for prisma
            openssl
          ];

          env = {
            PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
            PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
            PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
          };
        };
    };
}
