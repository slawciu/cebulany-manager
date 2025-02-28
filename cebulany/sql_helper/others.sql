select 
	Sum(other.cost) as "sum",
	other.name,
	strftime('%Y', "transaction"."date") as "year"
from other
inner join "transaction" on other.transaction_id = "transaction".id
group by other.name, strftime('%Y', "transaction"."date")
order by strftime('%Y', "transaction"."date"), other.name