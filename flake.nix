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
        let
          python-venv = python312.withPackages (p: with p; [ virtualenv ]);

          buildInputs = [
            python-venv
            zlib
            libglvnd    # For OpenGL support (provides libGL.so.1)
            mesa        # Mesa library for rendering
            libv4l  # Video4Linux support
          ];
        in
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

          # for python venv
          inherit buildInputs;

          # For prisma
          env = {
            PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
            PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
            PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";

          };

          # For python venv
          shellHook = ''
            export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath buildInputs}:$LD_LIBRARY_PATH"
            export LD_LIBRARY_PATH="${pkgs.stdenv.cc.cc.lib.outPath}/lib:$LD_LIBRARY_PATH"
          '';
        };
    };
}
