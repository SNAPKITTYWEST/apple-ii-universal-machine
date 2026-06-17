package body Trust_Contract is

   function Can_Boot return Trust_Status is
   begin
      return Allowed;
   end Can_Boot;

   function Can_Run_Debate return Trust_Status is
   begin
      return Allowed;
   end Can_Run_Debate;

   function Can_Write_Audit return Trust_Status is
   begin
      return Allowed;
   end Can_Write_Audit;

   function Can_Clear_Vault(User_Confirmed : Boolean) return Trust_Status is
   begin
      if User_Confirmed then
         return Allowed;
      else
         return Denied;
      end if;
   end Can_Clear_Vault;

   function Can_Export_Snapshot return Trust_Status is
   begin
      return Allowed;
   end Can_Export_Snapshot;

   function Can_Invoke_Lisp return Trust_Status is
   begin
      return Allowed;
   end Can_Invoke_Lisp;

   function Can_Invoke_Runtime return Trust_Status is
   begin
      return Allowed;
   end Can_Invoke_Runtime;

end Trust_Contract;
