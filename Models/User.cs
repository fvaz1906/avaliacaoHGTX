using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Avaliacao.Models
{
    public class User
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? CPF { get; set; }
        public string? Telephone { get; set; }
        public string? Cellphone { get; set; }
        public DateTime DateBirth { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        public bool Status { get; set; }

        [NotMapped]
        public UserProfile? UserProfile { get; set; }
    }
}
