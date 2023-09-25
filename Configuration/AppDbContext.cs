using Avaliacao.Helpers;
using Avaliacao.Models;
using Microsoft.EntityFrameworkCore;

namespace Avaliacao.Configuration
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            User user = new User
            {
                Id = 1,
                ProfileId = 1,
                Name = "Administrador",
                Email = "administrador@avalicao.com.br",
                Password = "P@ssw0rd",
                CPF = "40479526800",
                DateBirth = DateTime.Now,
                DateCreate = DateTime.Now,
                DateUpdate = DateTime.Now,
                Status = true
            };

            string hash = BCryptHash.generateHash(user);
            user.Password = hash;

            // Perfil do Usuário
            modelBuilder.Entity<UserProfile>().HasData(new UserProfile
            {
                Id = 1,
                Name = "Administrador",
                DateCreate = DateTime.Now,
                DateUpdate = DateTime.Now,
                Status = true
            });

            modelBuilder.Entity<UserProfile>().HasData(new UserProfile
            {
                Id = 2,
                Name = "Usuário",
                DateCreate = DateTime.Now,
                DateUpdate = DateTime.Now,
                Status = true
            });

            // Criação do Usuário padrão do sistema
            modelBuilder.Entity<User>().HasData(user);

            base.OnModelCreating(modelBuilder);

        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

    }
}
